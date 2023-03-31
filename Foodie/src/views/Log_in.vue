<template>
  
 


    <form class="main-box">
      <h1>
        Foodie
      </h1>
      <div class="mb-3">
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          placeholder="Email address" v-model="email">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">

        <input type="password" class="form-control" id="exampleInputPassword1" style="width: 285px" placeholder="Password"
          v-model="password">

      </div>

      <a type="submit" @click="login" class="btn btn-primary"> Log in </a>


      <button class="mojBatun"><img src="@/assets/slike/facebook.png">Log in with facebook</button>
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


export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
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

          document.cookie = `token=${data.token}; max-age=${7 * 24 * 60 * 60}; secure; HttpOnly; path=/`;
          console.log(document.cookie)
          //document.cookie = `token=${data.token}; path=/`; // save the JWT token in a cookie
          this.$router.push("/"); // redirect to the dashboard page
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
        this.$message.error(error.message || "Invalid email or password");
      }
    },
  },
};









</script>
