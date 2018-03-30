<template>
<aside class="menu" :style="getMenuStyle()">
  <ul class="menu-list">
    <li v-if="getActiveItem()">
        <div style="display: flex">
        <span style="flex:1">{{getActiveItem().name}}</span>
        <button class="button is-danger is-small is-right" @click="commands.deleteActive()"><i class="fa fa-trash"></i>Delete</button>
        </div>
    </li>
    <li v-for="attribute in getAttributes()">
      <a>
        <label class="label">{{attribute.title}}</label>
        <input class="input" type="text" :name="attribute.name" :value="attribute.value"
            @change="changed($event, attribute.name)"
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
</aside>
</template>

<script>
import Components from './components'
import { _ } from '../../support.js'

export default {
  data () {
    return {
        newAttribute: ''
    }
  },

  props: {
    commands: Object
  },

  methods: {
    getActiveItem() {
    if (!this.commands.activeItem)
        return null
      return this.commands.activeItem()
    },

    getMenuStyle() {
        if (this.getActiveItem()) {
            return {width:'240px'}
        }
        return {width:'0px'}
    },

    getAttributes () {
        var activeItem = this.getActiveItem()
        if (!activeItem)
            return []

        var attrs = []
        var tpl = Components.templates.find(t=>t.name==activeItem.name)
        if (tpl) {
            var template = tpl.template

            var moreAttributes = []
            var keys = Object.keys(activeItem.attributes)
            keys.forEach(k=> {
                if (tpl.attributes.find(a=>a.name==k)) {
                    return
                }
                moreAttributes.push({name:k,title:k,value:activeItem.attributes[k]})
            })
            
            activeItem.attributes = activeItem.attributes || {}
            for(var attr of [...tpl.attributes, ...moreAttributes]) {
                var value = activeItem.attributes[attr.name] || ''
                var activeAttribute = attrs.find(a=> {
                    a.name == attr.name
                })
                if (value == '')
                    value = null
                if (activeAttribute) {
                    activeAttribute.value = value
                } else {
                    attrs.push(Object.assign(attr,{value:value}))
                }
            }
        }

        return attrs;
    },

    changed: _.debounce(function (event, attribute) {
        var attributes = {}
        attributes[attribute] = event.srcElement.value
        this.commands.setAttributes(attributes)
    }, 250),

    addAttribute() {
        if (this.newAttribute == '' || !this.newAttribute) {
            return
        }

        var attributes = {}
        attributes[this.newAttribute] = ''
        this.newAttribute = ''
        this.commands.setAttributes(attributes)
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
}
</style>