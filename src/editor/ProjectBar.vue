<template>
<aside class="menu" style="width:260px">
  <div>
  <p class="menu-label">
    Project
  </p>  

  <button style="float:right; margin-bottom:4px" class="button is-small" @click="addPage()">
    <i class="fa fa-plus"></i> Add Page</button>

  <br style="clear:both">
  <ul class="menu-list">
    <li><a role="button" @click="togglePages()"><i class="fa fa-chevron-up" :class="showPages ? 'chevron-up':'chevron-down'"></i> <span class="menu-text">Pages</span></a>
      <ul v-if="showPages">
        <li v-for="(p, index) in pages" v-bind:key="'p' + index">
          <a role="button" :class="pageItemClass(p)" @click="loadPage(p)">
            <i class="fa fa-file"></i> {{p.options.name}}</a>
        </li>
      </ul>
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
      showPages: true
    }
  },
  computed: {
    pages () {
      return this.$store.state.editor.project.pages
    }
  },

  methods: {
    pageItemClass (p) {
      return p.id == this.$store.state.editor.root.id ? 'is-active' : null
    },
    togglePages () {
      this.showPages = !this.showPages
    },
    addPage () {
      this.$store.commit('editor/newPage')
      this.$store.commit('editor/setActive', null)
      // this.$forceUpdate()
    },
    loadPage (p) {
      this.$store.dispatch('editor/loadPage', p)
      // this.$forceUpdate()
    }
  }
}
</script>

<style>
button i.fa {
  padding-right:8px;
}
i.fa.fa-chevron-up {
  width: 14px;
  height: 14px;
  transform-origin: 7px 9px;
  transition: transform 150ms;
  float:right;
}
.chevron-up {
  transform: rotate(0deg);
}
.chevron-down {
  transform: rotate(180deg);
}
</style>
