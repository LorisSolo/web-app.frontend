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
    <navBar></navBar>
    <h1>shhssh</h1>
    <div class="containerr">
        <div class="input-group text_box">
            
            <input  placeholder="Naslov" class="form-control" aria-label="With textarea" v-model="title" style="margin-top:5px">
        </div>
        <div class="input-group text_box">
            
            <textarea placeholder="Sastojci" class="form-control" aria-label="With textarea" v-model="ingredients"></textarea>
        </div>
        <div class="input-group text_box" style="height:100px;width: 550px;">
            
            <textarea placeholder="Opis" class="form-control" aria-label="With textarea" v-model="description"></textarea>
        </div>
        <div class="input-group text_box">
      
    </div>
        <button type="submit" class="btn btn-primary" @click="dodajRecept()">Submit</button>

    </div>
</template>

<style scoped>
@import '../assets/myStyle.css';
</style>