
<!--
<template>
    <div>
      <button @click="saveButtonValue('banana')">Button 1</button>
      <button @click="saveButtonValue('kruska')">Button 2</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      saveButtonValue(buttonValue) {
        const email = 'pls@radi'; // replace with actual email
        fetch(`http://localhost:3000/api/v1/recepti/updateUser/MichaelReeves@1`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ buttonValue })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok.');
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
  }
  </script>
-->
<template>
  <div>
    <button @click="saveButtonValue('banana')">Button 1</button>
    <button @click="saveButtonValue('kruska')">Button 2</button>
    <button @click="saveButtonValue('secer')">Button 2</button>
    <button @click="saveButtonValue('paprika')">Paprika</button>
    <button @click="saveButtonValue('šljiva')">šljiva</button>
    <ul>
      <li v-for="item in userItems">{{ item }}</li>
    </ul>
    <li v-for="item in userItems">
  {{ item }}
  <button @click="deleteItem(item)">Delete</button>
</li>
  </div>
  <div>
        <h2>Matched Recipes</h2>
        <ul>
            <li v-for="recept in matchedRecepti" >{{ recept.title }}</li>
        </ul>
    </div>
</template>

<script>
//import jwt from 'jsonwebtoken'; error
import VueJwtDecode from 'vue-jwt-decode'
import Cookies from 'js-cookie'// novo
export default {
  data() {
    return {
      userItems: [],
      matchedRecepti: []
      
    };
  },
  methods: {
    
    async saveButtonValue(buttonValue) {
      const token = Cookies.get('token')
      console.log(Cookies.get('token'))
      //const token = this.$cookies.get('token');
      const decodedToken =  VueJwtDecode.decode(token)
      console.log(decodedToken)
      const userEmail = decodedToken.email;
      

      try {
        await fetch(`http://localhost:3000/api/v1/recepti/updateUser/${userEmail}`, {
          method: 'PATCH',
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
    await fetch(`http://localhost:3000/api/v1/recepti/deleteItem/${userEmail}/${item}`, {
      method: 'DELETE',
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
}
  },
  async created() {
    
    //const token = this.$cookies.get('token');
      const token = Cookies.get('token')
      const decodedToken =  VueJwtDecode.decode(token)
      const userEmail = decodedToken.email;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/recepti/getUserItems/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        this.userItems = data;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    const otherResponse = await fetch (`http://localhost:3000/api/v1/recepti/getUserRecepti/${userEmail}`);
    const data = await otherResponse.json();
    this.matchedRecepti = data;
    
  },
  
};
  
 /*
  async created() {
  try {
    const userEmail = this.$cookies.get('userEmail');
    console.log(userEmail)
    if (userEmail) {
      const response = await fetch(`http://localhost:3000/api/v1/recepti/getUserItems/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        this.userItems = data;
      } else {
        throw new Error('Network response was not ok.');
      }
    } else {
      throw new Error('User email not found in cookies.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}*/
  


</script>

<!--${ email }-->