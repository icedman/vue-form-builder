<template>
<aside class="menu" :style="getMenuStyle()">
<div style="min-width:200px">
  <ul class="menu-list">
    <li v-if="getActiveItem()">
        <div style="display: flex">
        <span style="flex:1">
            {{getActiveItem().name}}
        </span>
        <button class="button is-danger is-right"
            @click="deleteActiveItem()"
            ><i class="fa fa-trash"></i>Delete</button>
        </div>
    </li>
    <li v-for="option in getOptions()">
      <a>
        <label class="label">{{option.title}}</label>
        <input v-if="!option.content" class="input" type="text" :name="option.name" :value="option.value"
            @change="changed($event, option)"
        >
        <textarea v-if="option.content" class="textarea" type="text" :name="option.name" v-model="option.value"
            @change="changed($event, option)"
        ></textarea>
      </a>
    </li>
    <li>
        <div class="control padded" v-if="getActiveItem()">
            <hr>

        <input @change="addAttribute()" class="input attr-name" type="text" placeholder="Attribute Name" v-model="newAttribute">
        <button class="button" @click="addAttribute()"><i class="fa fa-plus"></i>Add Attribute</button>
        </div>
    </li>
  </ul>

  <div class="message is-info" v-html="description()">
  </div>

<!--
    <div class="message padded is-info">
    <ul>
      <li v-if="$store.state.editor.drag">Drag: {{$store.state.editor.drag.name}}</li>
      <li v-if="$store.state.editor.drop">Drop: {{$store.state.editor.drop.name}}</li>
    </ul>
    </div>
 -->

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
    getActiveItem () {
        return this.$store.state.editor.active
    },

    description () {
        if (!this.$store.state.editor.active) {
            return null
        }
        // return this.$store.state.editor.active
        var comp = this.$editor.getComponentByName(this.$store.state.editor.active.name)
        if (comp && comp.description) {
            return comp.description
        }
    },

    deleteActiveItem() {
        var item = this.getActiveItem()
        if (!item) {
            return
        }

        // save this page
        if (item.name == 'basic::page') {
            item.page = item.options.name
            this.$store.commit('editor/deletePage', item)
            return
        }

        this.$store.commit('editor/deleteItem', item)
    },

    getMenuStyle() {
        if (this.getActiveItem()) {
            // return {width:'240px'}
        }
        // return {width:'0px'}
    },

    getOptions () {
        var item = this.getActiveItem()
        if (!item) {
            return
        }
        var component = this.$editor.getComponentByName(item.name)
        var opts = []
        var defs = []
        if (component && component.options) {
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
                value: value,
                content: opt.content ? true : false
            })
        })
        return opts
    },

    addAttribute () {
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

        var value = attribute.split('=')
        if (value.length) {
            attribute=value[0]
            value = value[1]
        } else {
            value = ''
        }

        if (!item.options[attribute]) {
            this.$set(item.options, attribute, value)
        }
    },

    changed (event, option) {
        var item = this.getActiveItem()
        if (!item) {
            return
        }
        var value = event.srcElement.value

        // todo.. we're not correctly mutating state here
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

        // save this page
        if (item.id == 'basic::page') {
            this.$store.commit('editor/savePage', item)
        }

        this.$parent.$forceUpdate()
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
    zoom: 0.8;
}
button i {
    padding-right: 4px;
}
</style>