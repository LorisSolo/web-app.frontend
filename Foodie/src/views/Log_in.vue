<template>
  <form class="main-box">
    <h1>
      Ffood1e
    </h1>
    <div class="uploadInfo">
      <input placeholder="Email address" v-model="email">
      
    </div>
    <div class="uploadInfo">

      <input placeholder="Password"  v-model="password">

    </div>

    <a  @click="login" class="btnLogin"> Log in </a>


    <button class="btnFacebook"><img src="@/assets/slike/facebook.png">Log in with facebook</button>
  </form>

  <div class="box">
    <lable>Don't have an account?
      <RouterLink to="/signup">Sign_up</RouterLink>
    </lable>

  </div>
</template>


<style scoped>
@import '../assets/Log_in.css';
</style>

<script>
import { isAuthenticated } from '../router/helpers.js';

export default {
  data() {
    return {
      email: "",
      password: "",
      authFail: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("https://dwa-backend.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": 'application/json; charset=utf-8' },
          credentials: 'include',
          body: JSON.stringify({
            email: this.email,
            password: this.password,

          }),
        });
        const data = await response.json();
        if (response.ok) {
          //document.cookie = `token=${data.token}; max-age=${7 * 24 * 60 * 60}; secure; path=/`;
          this.$router.push("/");
        } else {
          if (isAuthenticated) this.authFail = true
          throw new Error(data.error);
        }
      } catch (error) {
        if (isAuthenticated) this.authFail = true

        this.$message.error(error.message || "Invalid email or password");
      }
    },
  },
};









</script>
