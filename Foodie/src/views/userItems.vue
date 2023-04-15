
<template>
  <div class="bcColor">


    <navBar></navBar>


    <div class="choose-ingredients">

      <div class="category-card">
        <h1>Meso i tjestenine</h1>

        <div class="buttons">
          <a class="myBtn" @click="saveButtonValue('teletina')">teletina</a>
          <a class="myBtn" @click="saveButtonValue('junetina')">junetina</a>
          <a class="myBtn" @click="saveButtonValue('svinjetina')">svinjetina</a>
          <a class="myBtn" @click="saveButtonValue('riba')">riba</a>
          <a class="myBtn" @click="saveButtonValue('piletina')">piletina</a>
          <a class="myBtn" @click="saveButtonValue('rezanci')">rezanci</a>


        </div>

      </div>

      <div class="category-card">
        <h1>Povrće</h1>

        <div class="buttons">
          <a class="myBtn" @click="saveButtonValue('špinat')">špinat</a>
          <a class="myBtn" @click="saveButtonValue('češnjak')">češnjak</a>
          <a class="myBtn" @click="saveButtonValue('krumpir')">krumpir</a>
          <a class="myBtn" @click="saveButtonValue('blitva')">blitva</a>
          <a class="myBtn" @click="saveButtonValue('peršin')">peršin</a>
          <a class="myBtn" @click="saveButtonValue('luk')">luk</a>
          <a class="myBtn" @click="saveButtonValue('mrkva')">mrkva</a>
          <a class="myBtn" @click="saveButtonValue('rajčica')">rajčica</a>
          <a class="myBtn" @click="saveButtonValue('tikvica')">tikvica</a>


        </div>
      </div>

      <div class="category-card">
        <h1>Ostalo</h1>

        <div class="buttons">

          <a class="myBtn" @click="saveButtonValue('ulje')">ulje</a>
          <a class="myBtn" @click="saveButtonValue('sol')">sol</a>
          <a class="myBtn" @click="saveButtonValue('papar')">papar</a>
          <a class="myBtn" @click="saveButtonValue('vegeta')">vegeta</a>


        </div>
      </div>

    </div>


    <div class="item-recepie-container">
      <div class="item-card">
        <h2>Vaši sastojci</h2>
        <li v-for="item in userItems">
          {{ item }}
          <a class="myBtn" @click="deleteItem(item)">Delete</a>
        </li>
      </div>


      <div class="item-card">
        <h2>Recepti koje možete raditi</h2>
        <ul>
          <li v-for="recept in matchedRecepti">{{ recept.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import VueJwtDecode from 'vue-jwt-decode'
import Cookies from 'js-cookie'
import navBar from '../components/navBar.vue'
import { defineComponent } from 'vue';
export default {
  components: {
    navBar,
    defineComponent
  },

  data() {
    return {
      userItems: [],
      matchedRecepti: []

    };
  },
  methods: {

    async saveButtonValue(buttonValue) {
      const token = Cookies.get('token')
      const decodedToken = VueJwtDecode.decode(token)
      const userEmail = decodedToken.email;
  

      try {
        await fetch(`https://dwa-backend.onrender.com/api/users/${userEmail}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          withCredentials: true,
          body: JSON.stringify({ buttonValue })
        })
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteItem(item) {
      const token = Cookies.get('token')
      const decodedToken = VueJwtDecode.decode(token)
      const userEmail = decodedToken.email;

      try {
        await fetch(`https://dwa-backend.onrender.com/api/users/item/${userEmail}/${item}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          withCredentials: true
        })


        const index = this.userItems.indexOf(item)
        if (index > -1) {
          this.userItems.splice(index, 1)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },

  },
  async created() {


    const token = Cookies.get('token')
    const decodedToken = VueJwtDecode.decode(token)
    const userEmail = decodedToken.email;
  

    try {
      const response = await fetch(`https://dwa-backend.onrender.com/api/users/items/${userEmail}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        withCredentials: true
      })
      if (response.ok) {
        const data = await response.json();
        this.userItems = data;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    const otherResponse = await fetch(`https://dwa-backend.onrender.com/api/users/recipes/${userEmail}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      withCredentials: true
    });
    const data = await otherResponse.json();
    this.matchedRecepti = data;

  },


};




</script>
<style scoped>
@import '../assets/myStyle.css';
</style>
