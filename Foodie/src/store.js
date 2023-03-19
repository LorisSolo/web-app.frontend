import { reactive } from 'vue';


export const store = reactive({

    id: JSON.parse(localStorage.getItem('id') || "{}"),
    title: JSON.parse(localStorage.getItem('title') || "{}"),
    ingredients: JSON.parse(localStorage.getItem('ingredients') || "{}"),
    description: JSON.parse(localStorage.getItem('description') || "{}"),
    picture: JSON.parse(localStorage.getItem('picture') || "{}"),

    setId(id) {
        this.id = id;
        localStorage.setItem("id",JSON.stringify(this.id));
    },
    setTitle(title) {
        this.title = title;
        localStorage.setItem("title",JSON.stringify(this.title));
    },
    setIngredients(ingredients) {
        this.ingredients = ingredients;
        localStorage.setItem("ingredients",JSON.stringify(this.ingredients));
        
    },
    setDescription(description) {
        this.description = description;
        localStorage.setItem("description",JSON.stringify(this.description));
    },
    setPicture(picture) {
        this.picture = picture;
        localStorage.setItem("picture",JSON.stringify(this.picture));
    }

});