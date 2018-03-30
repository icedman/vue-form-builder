<template>
<ion-content>

<section class="hero is-fullheight is-dark is-bold lazy" data-src="/bg_1.jpg">
    <div class="hero-body">

<div class="container">
  <div class="columns is-vcentered">
    <div class="column is-4 is-offset-4">
      
      <h1 class="title">
        Register an Account
      </h1>

<div class="box">
  <label class="label">Email</label>
  <p class="control">
    <input class="input" type="text" v-model="email" placeholder="jsmith@example.org">
  </p>
  <label class="label">Phone</label>
  <p class="control">
    <input class="input" type="number" v-model="phone" placeholder="ex. 908877665">
  </p>
  <label class="label">First Name</label>
  <p class="control">
    <input class="input" type="text" v-model="first_name" placeholder="John">
  </p>
  <label class="label">Last Name</label>
  <p class="control">
    <input class="input" type="text" v-model="last_name" placeholder="Smith">
  </p>

  <hr>

  <p class="control">
  <button class="button is-dark" style="width:100%;" @click="register()">Register</button>
  </p>

<br>

<p class="has-text-centered">
  <router-link to="/auth/login" :exact="true" :aria-expanded="false">
  Login
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
      phone: '',
      first_name: '',
      last_name: ''
    }
  },

  computed: {
  },

  methods: {
    register () {

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

