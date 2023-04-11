<template>
    <div class="bcColor">
        <navBar></navBar>


        <h1>Recepti</h1>




        <div class="content">
            <a style= "color: black;" @click="toRecepti(recept._id, recept.title, recept.ingredients, recept.description, recept.picture)" class="itemCard" v-for="recept in recepti">
                <img v-if="recept.picture" :src="recept.picture" style="width: 150px; height: 150px;" />
                <h5 class="cardText">{{ recept.title }}</h5>


              
</a>
        </div>



    </div>
</template>



<script>
import Cookies from 'js-cookie'
import navBar from '../components/navBar.vue'
import VueJwtDecode from 'vue-jwt-decode'

import { store } from '../store' 

export default {
    components: {
        navBar
    },
    data() {
        return {
            recepti: [],
        }
    },

    methods: {
        
        async dohvatiRecepte() {
            try {

                const token = Cookies.get('token')
                const decodedToken = VueJwtDecode.decode(token)
                const userEmail = decodedToken.email;
                
                const response = await fetch('http://localhost:3000/api/recipes', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    this.recepti = data;


                    this.recepti.forEach((recept) => {
                        let imgData = recept.picture;
                        try {
                            let img = btoa(
                                String.fromCharCode(...new Uint8Array(imgData.image.data.data))
                            );
                            recept.picture = `data:image/png;base64,${img}`;
                        } catch (e) {
                            recept.picture = null;
                        }
                    });



                } else {
                    console.log(response.status)
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error:', error);
                this.$message.error(error.message || 'Network response was not ok.');
            }
        },
        async toRecepti(id, title, ingredients, description, picture) {

            store.setId(id);
            store.setTitle(title);
            store.setIngredients(ingredients);
            store.setDescription(description);

            store.setPicture(picture);





            this.$router.push('/recipe'); 
        },
    },
    beforeMount() {
        store.setId("");
        store.setTitle("");
        store.setIngredients("");
        store.setDescription("");
        
    },


    async created() {
        await this.dohvatiRecepte();
    }
}





</script>



<style scoped>
@import '../assets/myStyle.css';
</style>