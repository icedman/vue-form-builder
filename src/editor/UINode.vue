<template>
<div @drop="drop($event, node)"
     @dragover="canDrop($event, node)"
      @drag="dragStart($event, node)" 
      @dragend="dragEnd($event, node)"
      @click="select($event, node)"
      :draggable="node.name!=='basic::page'"
        :class="[editorNodeClass, containerClass]"
        :style="containerStyle">
  <div v-if="html" v-html="html" @click="onClickHtmlRender($event, node)"></div>
  <ui-node v-if="!node[':hideChildren']"
    v-for="child in node.children"
      :node="child"
      :key="child.id">
  </ui-node>
</div>
</template>

<script>
export default {
  name: 'ui-node',
  props: {
    node: Object
  },

  computed: {
    html () {
      // todo move to renderer library
      var comp = this.$editor.getComponentByName(this.node.name)
      if (this.node.id != 'basic::page' && comp.container) {
        var ellipses = ''
        if (this.node[':hideChildren']) {
          ellipses = '...'
        }
        var name = ''
        if (this.node.options && this.node.options.name) {
          name = '::' + this.node.options.name
        }
        return `<span class="tag is-warning">${comp.baseName}${name}${ellipses}</span>`
        // return ''
      }
      if (comp && comp.template) {
        try {
          var options = Object.assign({}, this.node.options || {})
          if (comp.options) {
            comp.options.map(o=>o.name).forEach(k => {
              if (!options[k]) {
                options[k] = ''
              }
            })
          }
          
          var inject = []
          Object.keys(options).forEach(k => {
            var value = options[k]
            
            if (k == 'class')
              return

            inject.push(`${k}="${value}"`)
          })

          options.compile = function(t) {
            var res = eval(t)
            res = res.replace('data-ui-inject="true"', inject.join(' '))
            return res
          }

          var template = comp.preview || comp.template
          return options.compile('`'+template+'`')
        } catch(e) {
          // console.log(this.node.name +' ... template fail')
          console.log(e)
        }
        return comp.template
      }
      return null
    },

    containerClass () {
      if (!this.node)
        return null
      if (this.node.id == 'basic::page') {
        return null
      }
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp.container) {
        return ['ui-container', comp.container.class, this.node.options.class]
      }
      return ['ui-component']
    },

    containerStyle () {
      if (!this.node)
        return null
      if (this.node.id == 'basic::page') {
        return null
      }
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp.container && this.node.options.style) {
        return this.node.options.style
      }
      return null
    },

    editorNodeClass () {
      if (!this.node)
        return null
      if (this.$store.state.editor.drag && this.$store.state.editor.drag.id == this.node.id) {
        return 'ui-drag-item'
      }
      if (this.$store.state.editor.drop && this.$store.state.editor.drop.id == this.node.id) {
        return 'ui-drop-target'
      }
      if (this.$store.state.editor.active && this.$store.state.editor.active.id == this.node.id) {
        return 'ui-active-item'
      }
      return null
    }
  },

  methods: {

    select(event, component) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('editor/setActive', component)
    },

    dragStart(event, component) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('editor/setDrag', component)
    },

    dragEnd(event, component) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('editor/setDrag', null)
      this.$store.commit('editor/setDrop', null)
      this.$parent.$forceUpdate()
    },

    drop (event, target) {
      var dragItem = this.$store.state.editor.drag
      var dropTarget = this.$store.state.editor.drop
      var targetNode = this.$_.tree.findById(this.$store.state.editor.root, dropTarget.id)

      event.preventDefault()
      event.stopPropagation()

      if (targetNode) {

        if (dropTarget.id == dragItem.id) {
          return
        }

        var component = this.$editor.getComponentByName(dragItem.name)

        // set defaults (todo!)
        if (component.options) {
          dragItem.options = dragItem.options || {}
          Object.values(component.options).forEach(entry=>{
            if (!(dragItem.options[entry.name] || !dragItem.options[entry.name]=='')
                && entry.default) {
              this.$set(dragItem.options, entry.name, entry.default)
            }
          })
        }

        if (targetNode.id !='basic::page' && dragItem.parent == targetNode.parent && component.container) {
            var parentNode = this.$_.tree.findById(this.$store.state.editor.root, targetNode.parent)
            if (parentNode) {
              var idx = this.$_.tree.getChildIndex(parentNode, targetNode)
              targetNode = parentNode
              dropTarget.idx = idx
            }
        }

        // move to state mutation
        this.$_.tree.removeChild(this.$store.state.editor.root, dragItem)
        this.$_.tree.appendChild(targetNode, dragItem, dropTarget.idx)
        this.$forceUpdate()
      }
    },

    canDrop (event, target) {
      var dragName = this.$store.state.editor.drag.name
      if (this.$store.state.editor.drag.id == target.id) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      var target = {name:target.name, id:target.id, idx:null}

      var targetComponent = this.$editor.getComponentByName(target.name)
      if (!targetComponent.container) {

        var targetNode = this.$_.tree.findById(this.$store.state.editor.root, target.id)
        var parentNode = this.$_.tree.findById(this.$store.state.editor.root, targetNode.parent)
        if (parentNode) {
          var idx = this.$_.tree.getChildIndex(parentNode, targetNode)
          target = {name:parentNode.name, id:parentNode.id, idx:idx}
        }
      }

      if (this.$editor.canDropItemTo(dragName, target.name)) {
        event.preventDefault()
        event.stopPropagation()
        this.$store.commit('editor/setDrop', target)
      }
    },

    onClickHtmlRender(event, target) {
      // console.log(target)
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp.container && event.srcElement.tagName == 'SPAN') {
        this.$set(target, ':hideChildren', !target[':hideChildren'])
      }
    }
  }

}
</script>

<style>
.ui-container {
  min-height:40px;
  padding: 4px;
  border: 2px solid gainsboro;
  background: #f0f0f0;
}
.ui-component {
  padding: 4px;
  min-height:40px;
  background: #f5f5f5;
  border: 2px solid gainsboro;
}
.ui-drag-item {
  border: 2px solid red;
  opacity: 0.15;
}
.ui-drop-target {
  border: 2px solid black;
}
.ui-active-item {
  border: 2px solid black;
}
.ui-container.columns {
  margin: 0px !important;
}
.ui-container.column {
  margin: 0px !important;
}

.ui-container.columns span.tag,
.ui-container.column span.tag {
  position: relative;
  top: -2px;
  left: -2px;
}
</style>

