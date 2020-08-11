<template>
<div class=" container mt-5">
  <h1 class="titulo">
    ¿Te gustaria ayudar en emergencias cerca de tu zona?
  </h1>
  <section class=" features d-flex row justify-content-center">
    <div class="col-xl-3 col-lg-3 mx-4">
      <div class="d-flex justify-content-center mb-4">
        <i class="fas fa-globe-americas icon-big"></i> 
      </div>
      <h3>Emergencias de varias regiones</h3>
      <p>Emergencias en distintas partes del mundo en las que se requiere apoyo</p>
      <a class="btn btn-success">Ver más</a>
    </div>
    <div class="col-xl-3 col-lg-3 mx-4">
      <div class="d-flex justify-content-center mb-4">
        <i class="fas fa-users icon-big"></i> 
      </div>
      <h3>Voluntarios multidisciplinados</h3>
      <p>Voluntarios con habilidades distintas dependiendo de las tareas de cada emergencia</p>
      <a class="btn btn-success" @click="$router.push('/vol-eme-hab')">Ver más</a>
    </div>
    <div class="col-xl-3 col-lg-3 mx-4">
      <div class="d-flex justify-content-center mb-4">
        <i class="fas fa-building icon-big"></i> 
      </div>
      <h3>Apoyados por varias instituciones</h3>
      <p>El despliegue de voluntarios es coordinado y apoyado por distintas instituciones</p>
      <a class="btn btn-success" @click="$router.push('/about')">
        Ver más
      </a>
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
