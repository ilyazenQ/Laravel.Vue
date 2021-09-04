<template>
    <div class="row mt-5">
        <div class="col-12 p-3">
            <img :src="article.img" class="border rounded mx-auto d-block" alt="...">
            <h5 class="mt-5">{{article.title}}</h5>
            <p>
        <span class="tag" v-for="(tag,index) in article.tags">
            <span v-if="tagsLen == (index+1)">{{tag.label}}</span>
            <span v-else>{{tag.label}} | </span>
        </span>
            </p>
            <p class="card-text">{{article.body}}</p>
            <p>Опубликованно:  <i>{{article.created_at}}</i></p>
            <div class="mt-3">
           <views-component></views-component>
                <likes-component></likes-component>
             </div>
         </div>
        <comments-component></comments-component>
     </div>
 </template>

 <script>
 export default {
     data() {
         return { // обьект с переменными

         }
     },
     computed:{ // вычисления с простой логикой
       article() {
           return this.$store.state.article; // получаем статьи
       },
       tagsLen() {
           return this.$store.state.article.tags.length;
       }

     },
     methods:{

     },


     mounted() { // хук жизненного цикла
         console.log('Component mounted.')
     }
 }
 </script>
