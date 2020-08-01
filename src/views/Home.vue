<template>
<div class=" container mt-5">
  <h1 class="titulo">
    ¿Te gustaria ayudar en emergencias cerca de tu zona?
  </h1>
  <section class="d-flex row justify-content-center">
    <div class="col-xl-3 col-lg-3 mx-4">
      <div class="d-flex justify-content-center mb-5">
        <i class="fas fa-globe-americas icon-big"></i> 
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime blanditiis, tempora tempore necessitatibus suscipit dignissimos numquam. Accusamus dolor exercitationem eligendi labore cupiditate nisi, dolorem minima architecto repudiandae quas modi perferendis?</p>
    </div>
    <div class="col-xl-3 col-lg-3 mx-4">
      <div class="d-flex justify-content-center mb-5">
        <i class="fas fa-users icon-big"></i> 
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime blanditiis, tempora tempore necessitatibus suscipit dignissimos numquam. Accusamus dolor exercitationem eligendi labore cupiditate nisi, dolorem minima architecto repudiandae quas modi perferendis?</p>
    </div>
    <div class="col-xl-3 col-lg-3 mx-4">
      <div class="d-flex justify-content-center mb-5">
        <i class="fas fa-building icon-big"></i> 
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime blanditiis, tempora tempore necessitatibus suscipit dignissimos numquam. Accusamus dolor exercitationem eligendi labore cupiditate nisi, dolorem minima architecto repudiandae quas modi perferendis?</p>
    </div>
    

  </section>
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
