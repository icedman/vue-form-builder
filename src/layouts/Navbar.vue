<template>
<ion-header>
<nav class="navbar is-dark">
  <div class="navbar-brand">

    <!--
    <a class="navbar-item is-hidden-mobile" href="#" style="padding:4px">
      <img src="/src/assets/LE-OnBlack2.png" alt="Lechon Express" style="max-height:48px">
    </a>
    -->
  
    <ion-nav-back-button v-if="showBackButton" class="navbar-item is-hoverable" @click="back()">
    <i class="fa fa-chevron-left"></i>
    </ion-nav-back-button>

    <div class="navbar-burger burger is-hoverable" :class="menuActiveClass" data-target="navMenuToggled" @click="toggleMenu($event)">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenuToggled" class="navbar-menu" :class="menuActiveClass">
    <div class="navbar-start">
    
    <router-link v-for="item in menuItems" v-if="!item.right && item.path" :to="item.path" class="navbar-item is-hoverable" :key="item.id">
        <i :class="item.icon" v-if="item.icon"></i>
      <span class="navbar-item-text is-hidden-diesktop">{{item.title}}</span>
    </router-link>

    <a v-for="item in menuItems" v-if="item.cmd" :to="item.path" class="navbar-item is-hoverable" :key="item.id" @click="item.cmd()">
        <i :class="item.icon" v-if="item.icon"></i>
      <span class="navbar-item-text is-hidden-diesktop">{{item.title}}</span>
    </a>

    </div>

    <div class="navbar-end">

    <router-link v-for="item in menuItems" v-if="item.right" :to="item.path" class="navbar-item is-hoverable" :key="item.id">
        <i :class="item.icon" v-if="item.icon"></i>
      <span class="navbar-item-text is-hidden-diesktop">{{item.title}}</span>
    </router-link>

    </div>

  </div>
</nav>

</ion-header>
</template>

<script>
import 'vue-router'

export default {
  data () {
    return {
    }
  },

  computed: {
    menuItems() {
      return [...this.$store.state.ui.menu.items, ...this.$store.state.ui.menu.submenu]
    },

    showBackButton() {
      return true
      // return (this.$store.state.route.from.name !== null)
    },
    menuActiveClass () { return this.$store.state.ui.menu.active ? 'is-active' : null }
  },

  methods: {
    toggleMenu (event) {
      this.$store.commit('ui/setMenuActive', !this.$store.state.ui.menu.active)
    },

    back () {
      this.$router.go(-1)
    }
  },

  mounted () {
  }
}
</script>

<style scoped>
.navbar-item.is-mega {
  position: static;
  .is-mega-menu-title {
    margin-bottom: 0;
    padding: .375rem 1rem;
  }
}
.navbar-item {
  font-size:16pt;
}
.navbar-burger span {
  pointer-events:none;
}
i.fa {
  padding-right: 8px;
}
</style>
