<template>
<div>
<project-bar></project-bar>
<aside class="menu" style="width:260px">
  <div v-for="module in modules">
  <p class="menu-label">
    {{module.title}}
  </p>  
  <ul class="menu-list float-left">
    <li draggable v-for="component in module.components" 
      @drag="dragStart($event, component)" 
      @dragend="dragEnd($event, component)"
      v-if="component['list-item']"
      style="text-align:center; border:2px">
      <a v-html="component['list-item']">
      </a>
    </li>
  </ul>
  <hr style="clear:both">
  </div>
</aside>
</div>
</template>

<script>
import ProjectBar from './ProjectBar.vue'
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
  },

  components: {
    'project-bar': ProjectBar
  }
}
</script>

<style>
.menu-list.float-left li {
  margin:0px;
  float:left;
}
.menu-list.float-left li a {
  border: 1px solid transparent;
  border-radius: 0px;
  width: 120px;
}
.menu-list i.fa {
  padding-right: 6px;
}
i.icon-sprite {
  display: block;
  width: 80px;
  height: 50px;
  background: url('/dist/components-sprite.png');
  background-position:  0px calc(-84*0px);
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid transparent;
  margin-left: 8px;
}
i.icon-sprite.icon-row {
  background-position: 0px calc(-84*0px);
}
i.icon-sprite.icon-column {
  background-position: 0px calc(-84*1px);
}
i.icon-sprite.icon-button {
  background-position: 0px calc(-84*2px);
}
i.icon-sprite.icon-checkbox {
  background-position: 0px calc(-84*3px);
}
i.icon-sprite.icon-text {
  background-position: 0px calc(-84*10.11px);
}
i.icon-sprite.icon-radio {
  background-position: 0px calc(-84*16.06px);
}
i.icon-sprite.icon-textarea {
  background-position: 0px calc(-84*22.06px);
}
i.icon-sprite.icon-select {
  background-position: 0px calc(-84*19.06px);
}
i.icon-sprite.icon-container {
  background-position: 0px calc(-84*29.15px);
}
i.icon-sprite.icon-link {
  background-position: 0px calc(-84*8px);
}
i.icon-sprite.icon-image {
  background-position: 0px calc(-84*9.05px);
}
i.icon-sprite.icon-heading {
  background-position: 0px calc(-84*7px);
}
i.icon-sprite.icon-paragraph {
  background-position: 0px calc(-84*15.1px);
}
</style>
