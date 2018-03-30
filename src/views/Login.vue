<template>
<ion-content>

<section class="hero is-fullheight is-dark is-bold lazy" data-src="/dist/bg_1.jpg">
    <div class="hero-body">

<div class="container">
  <div class="columns is-vcentered">
    <div class="column is-4 is-offset-4">
      
      <div width="100%" style="text-align:center">
      <img data-src='/dist/logo.png' style="height:300px"/>
      </div>

<div class="box">

  <label class="label">Email</label>
  <p class="control">
    <input _autocomplete='off' class="input" type="number" v-model="email" placeholder="Email">
  </p>

  <label class="label">Password</label>
  <p class="control">
    <input autocomplete='off' class="input" type="password" v-model="password" placeholder="Password">
  </p>

  <hr>

  <p class="control">
  <button class="button is-dark" style="width:100%;" @click="login()">Login</button>
  </p>

<br>

<p class="has-text-centered">
  <router-link to="/auth/register" :exact="true" :aria-expanded="false">
  Register an Account
  </router-link>
  | 
  <router-link to="/auth/forget" :exact="true" :aria-expanded="false">
  Forgot password
  </router-link>
</p>

</div>


    </div>
  </div>
</div>

    </div>
  </section>

</ion-content>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
  },

  methods: {
    login () {
    }
  },

  mounted () {
  }
}
</script>

<style scoped>
.hero {
  background-position: center center;
  background-size: cover;
}
p.control {
  margin-bottom: 8px;
}
</style>

