<template>
    <navBar></navBar>


    <h1>Odabir namjernica</h1>
    <div class="card c-namjernice" style="width: 50rem;">
        <div class="card-body">

            <h5 class="card-title">Card title</h5>
            <div class="namjernice">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Piletina" id="flexCheckDefault" name="test[]">
                    <label class="form-check-label" for="flexCheckDefault">
                        Piletina
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Teletina" id="flexCheckDefault" name="test[]">
                    <label class="form-check-label" for="flexCheckDefault">
                        Teletina
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Svinjetina" id="flexCheckDefault" name="test[]">
                    <label class="form-check-label" for="flexCheckDefault">
                        Svinjetina
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Riža" id="flexCheckDefault" name="test[]">
                    <label class="form-check-label" for="flexCheckDefault">
                        Riža
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="test[]">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="test[]">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>

                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>

                </div>



            </div>

        </div>
        <button class="btn btn-primary batun" type="submit" id="batun" style="background-color:brown">Button</button>
    </div>

    <h2 style="margin-left: 25px; ">Recepti</h2>
    <hr>







    <div class="recepti">

        <div class="card r-card" style="width: 18rem;" v-for="recept in recepti">
            <!-- <img src="..." class="card-img-top" alt="..."> -->
            <div class="card-body">
                <img v-if="recept.picture" :src="recept.picture" style="width: 150px; height: 150px;" />
                <h5 class="card-title">{{ recept.title }}</h5>
                <p class="card-text"> {{ recept.description }}</p>
                <button
                    @click="toRecepti(recept._id, recept.title, recept.ingredients, recept.description, recept.picture)">Go
                    somewhere</button>

            </div>
        </div>
    </div>
</template>



<script>
import Cookies from 'js-cookie'
import navBar from '../components/navBar.vue'

import { store } from '../store' // DODAN STORE ZA GLOBALNe VARIJABLE

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
                console.log(Cookies.get('token'))
                const response = await fetch('http://localhost:3000/api/v1/recepti', {
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
            
            



            this.$router.push('/recept'); // poslat ce te na rutu /recept
        },
    },
    beforeMount() {
        store.setId("");
        store.setTitle("");
        store.setIngredients("");
        store.setDescription("");
        // store.setPicture("");
    },


    async created() {
        await this.dohvatiRecepte();
    }
}





</script>











<style scoped>
@import '../assets/myStyle.css';
</style>