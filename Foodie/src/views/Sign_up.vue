<template>
    <form class="main-box">
        <h1>
            Ffood1e
        </h1>
        <div class="mb-3">
            
            <input type="usernamname" class="form-control" id="username1" aria-describedby="emailHelp"
                placeholder="username" style="width: 285px;" v-model="username">

        </div>
        <div class="mb-3">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Email address" v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">

            <input type="password" class="form-control" id="exampleInputPassword1" style="width: 285px"
                placeholder="Password" v-model="password">

        </div>

        <a type="submit" class="btn btn-primary" @click="dodajUsera()">Sign up</a>

        <button class="mojBatun"><img src="@/assets/slike/facebook.png">Log in with facebook</button>
    </form>
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
               if (err){
                console.log(err);
                
               } 
            });


        }
    }

}

</script>
