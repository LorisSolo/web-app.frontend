<template>
    <img v-if="!noImage" :src="picture" style="width: 300px; height: 300px;" />



    <!-- FILE SELECTOR -->
    <div class="m-2 mt-3" style="display: flex; align-items: center;">
        <div class="text-warning">PNG required</div>
        <p>Odaberi sliku</p>
        <input style="font-size: 14px;" type="file" ref="file" accept="image/*" @change="" />

        <button class="btn btn-info py-0 mt-2" style="font-size: 14px; color: white;" @click="uploadSlike()">Promjeni sliku
            sliku</button>
    </div>



    <p class="card-text"> {{ title }}</p>
    <li v-for="ingredient in ingredients">{{ ingredient }}</li>
    <p class="card-text"> {{ description }}</p>
</template>
<script>
import Cookies from 'js-cookie' // novo
import navBar from '../components/navBar.vue'
import { store } from '../store'
export default {
    components: {
        navBar
    },
    data() {
        return {
            noImage: false,
            id: store.id,
            title: store.title,
            ingredients: store.ingredients, // 
            description: store.description,
            picture: store.picture
        }
    },

    methods: {


        async uploadSlike() {

            const imageData = new FormData();
            const fileField = document.querySelector('input[type="file"]');
            imageData.append("name", "textImage")
            let myFile = fileField.files[0];
            imageData.append("picture", myFile);

            await fetch(`http://localhost:3000/api/v1/recepti/editPicture/${this.id}`, {
                method: 'PATCH', credentials: 'include',
                body: imageData
            }).then(() => {
                this.$router.push('/');
            });


        },




    },
    beforeMount() {

        if (this.picture == null) {
            this.noImage = true;
        }

        /*
        if (this.picture != "") {
            this.noImage = true;
        } 
        */

        /*
        try {
            if (this.picture.image.data) {
                let img = btoa(
                    String.fromCharCode(...new Uint8Array(this.picture.image.data.data))
                );
                this.picture = `data:image/png;base64,${img}`;
            }
        } catch (e) {
            this.noImage = true;
        }
        */
                
    }




}


</script>