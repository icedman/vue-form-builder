<template>
<div :class="[containerClass]" :style="containerStyle" v-bind="containerInject" @click="select($event, node)">
  <div class="component-wrapper" v-if="html" v-html="html"></div>
  <rendered-node
    v-for="child in node.children"
      :node="child"
      :key="child.id">
  </rendered-node>
</div>
</template>

<script>
export default {
  name: 'rendered-node',

  data () {
    return {
      containerInject: {}
    }
  },

  props: {
    node: Object,
  },

  computed: {
    html () {
      return this.$editor.preview(this.node)
    },

    containerClass () {
      if (!this.node)
        return null
      if (this.node.id == 'basic::page') {
        return null
      }
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp.container) {
        var nodeOptionClass = null
        if (this.node.options) {
          nodeOptionClass = this.node.options.class
        }
        return [comp.container.class, nodeOptionClass]
      }
      return []
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
    }
  },

  methods: {
    select(event, component) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('editor/setActive', component)
    },
  }

}
</script>

<style>
.columns {
  margin:0px !important;
}
</style>
