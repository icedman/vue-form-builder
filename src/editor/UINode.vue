<template>
<div @drop="drop($event, node)"
     @dragover="canDrop($event, node)"
      @drag="dragStart($event, node)" 
      @dragend="dragEnd($event, node)"
      @click="select($event, node)"
      :draggable="node.id!==0" :class="[containerClass]">
  <!-- {{node.name}} {{node.id}} -->
  <div v-html="html"></div>
  <ui-node class='ui-component'
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
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp) {
        return comp.template
      }
      return null
    },

    containerClass () {
      if (!this.node)
        return null
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp.container) {
        return ['ui-container', comp.container.class]
      }
      return null
    },
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
      if (!this.$editor.canDropItemTo(dragItem.name, target.name)) {
        return
      }

      var dropTarget = this.$store.state.editor.drop

      event.preventDefault()
      event.stopPropagation()

      var targetNode = this.$_.tree.findById(this.$store.state.editor.root, dropTarget.id)
      if (targetNode) {
        this.$_.tree.removeChild(this.$store.state.editor.root, dragItem)
        this.$_.tree.appendChild(targetNode, dragItem)
        this.$forceUpdate()
      }
    },

    canDrop (event, target) {
      var dragName = this.$store.state.editor.drag.name
      if (this.$editor.canDropItemTo(dragName, target.name)) {
        event.preventDefault()
        event.stopPropagation()
        this.$store.commit('editor/setDrop', {name:target.name, id:target.id})
      }
    }
  }

}
</script>

<style>
.ui-container {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  min-height:40px;
  border: 1px solid gainsboro;
}
.ui-component {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  min-height:50px;
  background: #f5f5f5;
}
</style>

