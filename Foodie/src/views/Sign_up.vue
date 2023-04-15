<template>
    <div class="bcColor">
        <div class="main-box">
            <h1>
                Ffoodie
            </h1>
            <div class="uploadInfo">
                <input type="text" placeholder="Username" v-model="username">

            </div>
            <div class="uploadInfo">
                <input type="email" placeholder="Email address" v-model="email">

            </div>
            <div class="uploadInfo">

                <input type="password" placeholder="Password" v-model="password">

            </div>


            <a class="btnLogin" @click="dodajUsera()">Sign up</a>

            <button class="btnFacebook"><img src="@/assets/slike/facebook.png">Log in with facebook</button>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/Log_in.css';
</style>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {




    data() {
        return {
            username: "",
            email: "",
            password: "",

        }

    },


    methods: {

        async dodajUsera() {

            let json = { "username": this.username, "email": this.email, "password": this.password }

            await fetch('https://dwa-backend.onrender.com/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.$router.push('/login')
                console.log(data)
            }).catch((err) => {
                if (err) {
                    console.log(err);

                }
            });


        }
    }

}

</script>
