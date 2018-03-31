<template>
<aside class="menu" :style="getMenuStyle()">
<div style="min-width:200px">
  <ul class="menu-list">
    <li v-if="getActiveItem()">
        <div style="display: flex">
        <span style="flex:1">{{getActiveItem().name}}</span>
        <button class="button is-danger is-small is-right" @click="deleteActiveItem()"><i class="fa fa-trash"></i>Delete</button>
        </div>
    </li>
    <li v-for="option in getOptions()">
      <a>
        <label class="label">{{option.title}}</label>
        <input class="input" type="text" :name="option.name" :value="option.value"
            @change="changed($event, option)"
        >
      </a>
    </li>
    <li>
        <div class="control padded" v-if="getActiveItem()">
            <hr>

        <input class="input attr-name" type="text" placeholder="Attribute Name" v-model="newAttribute">
        <button class="button is-small" @click="addAttribute()"><i class="fa fa-plus"></i>Add Attribute</button>
        </div>
    </li>
  </ul>

    <ul v-if="getActiveItem()">
      <li v-if="$store.state.editor.drag">Drag: {{$store.state.editor.drag.name}}</li>
      <li v-if="$store.state.editor.drop">Drop: {{$store.state.editor.drop.name}}</li>
      <li v-if="$store.state.editor.active">Active: {{$store.state.editor.active.name}}</li>
    </ul>

    <!-- {{$store.state.editor.active}} -->
</div>
</aside>
</template>

<script>
export default {
  data () {
    return {
        newAttribute: ''
    }
  },

  methods: {
    getActiveItem() {
        return this.$store.state.editor.active
    },

    deleteActiveItem() {
        var item = this.getActiveItem()
        if (!item) {
            return
        }
        this.$store.commit('editor/deleteItem', item)
    },

    getMenuStyle() {
        if (this.getActiveItem()) {
            return {width:'240px'}
        }
        return {width:'0px'}
    },

    getOptions () {
        var item = this.getActiveItem()
        if (!item) {
            return
        }
        var component = this.$editor.getComponentByName(item.name)
        var opts = []
        var defs = []
        if (component.options) {
            defs = [...component.options]
        }
        if (item.options) {
            var compOptions = defs.map(o=>o.name)
            Object.keys(item.options).forEach(k=>{
                if (compOptions.indexOf(k)!=-1)
                    return
                defs.push({name:k,title:k})
            })
        }
        defs.forEach(opt=>{
            var value = ''
            if (item.options) {
                if (item.options[opt.name]) {
                    value = item.options[opt.name]
                }
            }
            opts.push({
                name: opt.name,
                title: opt.title,
                value: value
            })
        })
        return opts
    },

    addAttribute() {
        if (this.newAttribute == '' ) {
            return
        }
        var attribute = this.newAttribute
        this.newAttribute = ''
        var item = this.getActiveItem()
        if (!item) {
            return
        }
        if (!item.options) {
            this.$set(item, 'options', {})
        }

        if (!item.options[attribute]) {
            this.$set(item.options, attribute, '')
        }
    },

    changed (event, option) {
        var item = this.getActiveItem()
        if (!item) {
            return
        }
        var value = event.srcElement.value
        // warning.. we're not state.committing here
        if (!item.options) {
            this.$set(item, 'options', {})
        }
        if (!item.options[option.name]) {
            this.$set(item.options, option.name, '')
        }
        if (value == '') {
            this.$delete(item.options, option.name)
        } else {
            item.options[option.name] = value
        }
    }
  },

  mounted () {
    
  }
}
</script>

<style scoped>
.attr-name {
    margin-bottom: 8px;
}
.menu {
    transition: width 500ms;
    overflow-x: hidden;
}
button i {
    padding-right: 4px;
}
</style>