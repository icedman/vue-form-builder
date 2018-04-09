<template>
<ion-content class="full-height">

<div class="workspace-container">
<div class="fit-content padded bar">
<sidebar></sidebar>
</div>

<div class="fit-content workspace-inner" style="flex:1">
  <div class="hero is-primary">
    <div class="padded">
      <div class="title">{{$store.state.editor.root.options.name}}
        <button class="button is-primary" 
        @click="renderForm()" style="float:right">
        <span v-if="!previewMode"><i class="fa fa-eye icon-only"></i></span>
        <span v-if="previewMode"><i class="fa fa-pencil icon-only"></i></span>
        </button>
      </div>
    </div>
  </div>
  <div class="padded">
<ui-node v-if="!previewMode" :node="$store.state.editor.root" class="workspace"></ui-node>
<rendered-node v-if="previewMode" :node="$store.state.editor.root"></rendered-node>
  </div>
</div>

<div class="fit-content padded bar">
<property></property>
</div>
</div>

</ion-content>
</template>

<script>
import Sidebar from '../editor/Sidebar'
import PropertyBar from '../editor/PropertyBar'
import UINode from '../editor/UINode'
import RenderedNode from '../editor/RenderedNode'

export default {
  data () {
    return {
      previewMode: false
    }
  },

  computed: {
  },

  methods: {
    loadProject () {
      this.$store.dispatch('editor/loadProject')
    },

    saveProject () {
      this.$store.dispatch('editor/saveProject')
      this.$store.dispatch('editor/savePage', this.$store.state.editor.root)
    },

    renderForm () {
      this.$store.commit('editor/setActive', null)
      this.previewMode = !this.previewMode

      if (this.previewMode) {
        setTimeout(()=>{
          var wrappers = document.querySelectorAll('.component-wrapper')
          wrappers.forEach(n=>{
            n.outerHTML = n.innerHTML
          })
        }, 250)
      }
    }
  },

  mounted () {
    this.$store.commit('ui/setSubMenu', [
        { cmd: ()=>this.loadProject(), title: 'Load', icon: 'fa fa-folder-open' },
        { cmd: ()=>this.saveProject(), title: 'Save', icon: 'fa fa-save' },
        // { cmd: ()=>this.renderForm(), title: 'Settings', icon: 'fa fa-cog' }
      ])
    this.loadProject()
  },

  beforeDestroyed() {
    this.$store.commit('ui/setSubMenuItems', [])
  },

  components: {
    'sidebar': Sidebar,
    'property': PropertyBar,
    'ui-node': UINode,
    'rendered-node': RenderedNode,
  }
}
</script>


<style>
div {
  transition: border 500ms;
}
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
.workspace-inner {
  background: #e0e0e0;
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
.fit-content {
  display: block;
  overflow-y: scroll;
}
.bar {
  max-width: 300px;
}
button i.fa.icon-only {
  padding-right: 0px;
}
</style>

