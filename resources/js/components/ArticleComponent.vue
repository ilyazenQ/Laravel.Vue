<template>
    <div class="container">
       <h1>Test</h1>
    </div>
</template>

<script>
export default {
    data() {
        return { // обьект с переменными
            hello:"HI",
        }
    },
    computed:{ // вычисления с простой логикой
      helloToUp(){
          return this.hello.toUpperCase();
      },
        fullName(){
          return this.$store.getters.getFullName
        },
        name() {
          return this.$store.state.firstname
        }

    },
    methods:{
        sum(a,b) {
            return a+b
        },
    },


    mounted() { // хук жизненного цикла
        console.log('Component mounted.')
    }
}
</script>
