<template>
    <div class="bcColor">
        <navBar></navBar>

        <div class="viewRecipe">

            <input style="font-size: 14px;" type="file" ref="file" accept="image/*" @change="" />
            <a @click="uploadSlike()" class="myBtn">Promjeni sliku</a>

            <img v-if="!noImage" :src="picture" style="width: 300px; height: 300px;" />

            <h1>{{ title }}</h1>

            <div class="ingredient-list">
                <div class="ingredient" li v-for="ingredient in ingredients">
                    {{ ingredient }}

                </div>

            </div>

            <p>
                {{ description }}
            </p>


        </div>
    </div>
</template>
<script>

import Cookies from 'js-cookie'
import navBar from '../components/navBar.vue'
import { store } from '../store'
import VueJwtDecode from 'vue-jwt-decode'
export default {
    components: {
        navBar
    },
    data() {
        return {
            noImage: false,
            id: store.id,
            title: store.title,
            ingredients: store.ingredients,
            description: store.description,
            picture: store.picture
        }
    },

    methods: {



        async uploadSlike() {
            const token = Cookies.get('token')
            console.log(Cookies.get('token'))
            const decodedToken = VueJwtDecode.decode(token)
            const userEmail = decodedToken.email;

            const imageData = new FormData();
            const fileField = document.querySelector('input[type="file"]');
            imageData.append("name", "textImage")
            let myFile = fileField.files[0];
            imageData.append("picture", myFile);

            await fetch(`https://dwa-backend.onrender.com/api/recipes/editPicture/${this.id}`, {
                method: 'PATCH', credentials: 'include',
                body: imageData,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            }).then(() => {
                this.$router.push('/');
            });


        },




    },
    beforeMount() {

        if (this.picture == null) {
            this.noImage = true;
        }

    }




}


</script>

<style scoped>
@import '../assets/myStyle.css';
</style>