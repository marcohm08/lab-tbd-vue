<template>
  <div class=" container mt-5">
    <h2 class="mb-3">Busqueda de voluntario segun emergencia </h2>
    <div class="row mx-5 my-3">
      <input type="text" placeholder="Ingrese nombre de la emergencia" class="form-control mx-3" style="width: 50%" v-model="nombreEmergencia">
      <button class="btn btn-primary" @click="obtenerVoluntarios(nombreEmergencia)">Buscar</button>
    </div>
    <div v-if="voluntarios.length != 0">
      <table class="table table-fixed">
        <thead>
          <tr>
            <th class="col-xs-3">Nombre</th>
            <th class="col-xs-3">Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(voluntario,index) in voluntarios" :key="index">
            <td class="col-xs-3">{{voluntario.id}}</td>
            <td class="col-xs-3">{{voluntario.nombre}}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
