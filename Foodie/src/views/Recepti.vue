<script>
import Cookies from 'js-cookie' // novo
import navBar from '../components/navBar.vue'
export default {
    components: {
        navBar
    },
    data() {
        return {

            title: "",
            description: "",
            ingredients: "",
        }
    },

    methods: {

        async dodajRecept() {
            try{
                const token = Cookies.get('token') 
            console.log(Cookies.get('token')) 
            let json = { "title": this.title, "description": this.description, "ingredients": this.ingredients.split(" ") }

            await fetch('http://localhost:3000/api/v1/recepti/dodajRecept', {
                method: 'POST',
                body: JSON.stringify(json),
                
                headers: {
                    'Content-Type': 'application/json; charset=utf-8', 
                    'Authorization': 'Bearer ' + token
                     
                },
                withCredentials: true
                
            });

            } catch (error) {
                console.error('Error:', error);
                this.$message.error(error.message || 'Network response was not ok.');
            }
            
        },
        async uploadImg(){

        }
        
     

    }


}


</script>
<template>
    <div class="bcColor">
        <navBar></navBar>
  

  
    <div class="uploadContent">
        <h4>Pošaljite svoj recept</h4>
        <input type="text" placeholder="Naslov" v-model="title">
        <input type="text" placeholder="Ingredients" v-model="ingredients">

        <textarea name="" id="" cols="30" rows="10" placeholder="Opis" v-model="description"></textarea>
    
        <a @click="dodajRecept()" class="myBtn">
            Upload
        </a>
    </div>
  
 

 
    </div>
    
</template>

<style scoped>
@import '../assets/myStyle.css';
</style>