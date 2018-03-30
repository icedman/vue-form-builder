<template>
<aside class="menu" style="min-width:120px">
  <div v-for="module in modules">
  <p class="menu-label">
    {{module.title}}
  </p>  
  <ul class="menu-list">
    <li draggable v-for="component in module.components" 
      @drag="dragStart($event, component)" 
      @dragend="dragEnd($event, component)">
      <a v-html="component['list-item']">
      </a>
    </li>
  </ul>
  <hr>
  </div>
</aside>
</template>

<script>
export default {
  data () {
    return {
      modules: []
    }
  },

  computed: {
  },

  methods: {
    dragStart(event, component) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('editor/setDrag', {name:component.name, id:null})
    },

    dragEnd(event, component) {
      event.preventDefault()
      event.stopPropagation()
      this.$store.commit('editor/setDrag', null)
      this.$store.commit('editor/setDrop', null)
    }
  },

  mounted () {
    var defs = Object.values(this.$editor.modules)
    var modules = []
    defs.forEach(m=>{
      var module = {
        title: m.title,
        components: Object.values(m.components)
      }
      var components = Object.values(m.components)
      components.forEach(c=>{
        module.components.push(Object.assign({},c))
      })

      modules.push(m)
    })

    this.modules = modules
  }
}
</script>

<style scoped>
.menu-list li a {
  border: 1px solid transparent;
  border-radius: 0px;
}
.menu-list i.fa {
  padding-right: 6px;
}
.is-dragged {
  border: 2px solid red;
}
</style>
