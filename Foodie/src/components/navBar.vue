<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: brown">
      
          <div class="container-fluid">
              <svg class="burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                      d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1H61.1zM144 128c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zm240 16c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16zM272 96c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16zM16 304c0-26.5 21.5-48 48-48H448c26.5 0 48 21.5 48 48s-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V400z" />
              </svg>
              <a class="navbar-brand" href="#">Ffood1e</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <RouterLink class ="nav-link active" to="/">Naslovnica</RouterLink>
                      </li>
                      <li class="nav-item">
                          <RouterLink class ="nav-link active" to="/upload">Slanje recepata</RouterLink>
                      </li>
                      <li class="nav-item">
                          <RouterLink class ="nav-link active" to="/myFridge">Moj frižider</RouterLink>
                      </li>
                      </ul>
                  <form class="d-flex" role="search">
                     
                      <a class="myBtn" type="submit" @click="logout" >Logout</a>
                  </form>
              </div>
          </div>
      </nav>
  
  
  
  </template>
  
  <script>
  
  export default {
      name: "navBar",
    
    methods: {
      async logout() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
  
        const data = await response.json();
        console.log(data.message);
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error(error);
      }
    }
  }
  }
  </script>
  <style scoped>
  @import '../assets/myStyle.css';
  </style>