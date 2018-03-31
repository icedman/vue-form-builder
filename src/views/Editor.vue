<template>
<ion-content class="full-height">

<!--
<section class="hero is-primary animated" :class="$store.state.ui.animate ? 'run-animated':null">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Some Hero Banner
      </h1>
      <h2 class="subtitle">
        And its description
      </h2>
    </div>
  </div>
</section>
-->

<div class="workspace-container">
<div class="padded" style="overflow-y: auto; min-height:1200px">
<sidebar></sidebar>
</div>

<ui-node :node="$store.state.editor.root" class="workspace padded"></ui-node>

<div class="padded" style="overflow-y: auto;">
<property></property>
</div>
</div>

</ion-content>
</template>

<script>
import Sidebar from '../editor/Sidebar'
import PropertyBar from '../editor/PropertyBar'
import UINode from '../editor/UINode'

export default {
  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    loadFromLocalStorage () {
      var localCopy = JSON.parse(window.localStorage.getItem('editor-root'))
      if (localCopy) {
        this.$store.commit('editor/setRoot', localCopy)
      }
      this.$forceUpdate()
    },

    saveToLocalStorage () {
      window.localStorage.setItem('editor-root', JSON.stringify(this.$store.state.editor.root))
    }
  },

  mounted () {
    this.$store.commit('ui/setSubMenu', [
        { cmd: ()=>this.loadFromLocalStorage(), title: 'Load', icon: 'fa fa-folder-open' },
        { cmd: ()=>this.saveToLocalStorage(), title: 'Save', icon: 'fa fa-save' },
        { cmd: ()=>{}, title: 'Render', icon: 'fa fa-cogs' }
      ])
    this.loadFromLocalStorage()
  },

  beforeDestroyed() {
    this.$store.commit('ui/setSubMenuItems', [])
  },

  components: {
    'sidebar': Sidebar,
    'property': PropertyBar,
    'ui-node': UINode,
  }
}
</script>


<style scoped>
.animated {
  height: 0px;
  transition: height 250ms
}
.animated.run-animated {
  height: 160px;
}
.workspace-container {
  display: flex;
}
.workspace {
  flex: 1;
  background: #f0f0f0;
  padding: 30px;
  border: 2px solid transparent;
}
.workspace.ui-active.item {
  border: 2px solid transparent !important; 
}
</style>

