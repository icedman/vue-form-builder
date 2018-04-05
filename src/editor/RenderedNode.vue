<template>
<div :class="[containerClass]" v-bind="containerInject">
  <div v-if="html" v-html="html"></div>
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
      var comp = this.$editor.getComponentByName(this.node.name)
      if (comp.container) {
        return null
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
          
          var containerAttributes = {}
          var inject = []
          Object.keys(options).forEach(k => {
            var value = options[k]
            
            if (k == 'class')
              return

            inject.push(`${k}="${value}"`)
            containerAttributes[k] = value
          })

          if (comp.container) {
            this.containerAttributes = containerAttributes
          }

          options.compile = function(t) {
            var res = eval(t)
            res = res.replace('data-ui-inject="true"', inject.join(' '))
            return res
          }

          return options.compile('`'+comp.template+'`')
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
      if (this.node.id == 0) {
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
    }
  },

  methods: {
  }

}
</script>
