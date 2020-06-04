<template>
<div class=" container mt-5">
  <h1>
    Bienvenidos
  </h1>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus a dolores optio, dolorem architecto natus ullam aliquid exercitationem! Suscipit, voluptate enim nesciunt cumque ipsum eos? Et eaque laudantium molestias. Quaerat?
  </p>

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fugiat tempora tenetur numquam, perspiciatis reprehenderit maxime quia magni. Ullam non excepturi distinctio quo ex cupiditate ipsa delectus? Fuga, molestiae necessitatibus?
  </p>

  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis repellendus officiis, expedita ut, hic magni aliquam excepturi modi aut quaerat possimus aperiam nesciunt a asperiores magnam. At aperiam nesciunt saepe!
  </p>

</div>

</template>

<script>


export default {
  name: 'Home',
  data(){
    return {
      nombreEmergencia: '',
      voluntarios: []
    }
  },
  methods:{
    obtenerVoluntarios(nombre){
      if(nombre != ''){
        this.$http.get("/voluntario/nombre-emergencia/"+nombre).then(response => {
          this.voluntarios = response.data
        }).catch(error => {console.log(error.message)})

      }
    }
  }

  
}
</script>
