<template>
  <div class=" container mt-5">
    <h1>TEST</h1>
    <h2 class="mb-3">Log de tareas</h2>
    <div class="row mx-5 my-3">
      <button class="btn btn-primary" @click="actualizarTarea()">Actualizar tarea aleatoria</button>
    </div>
    <div v-if="logTareas.length != 0">
      <table class="table table-fixed">
        <thead>
          <tr class="table_title">
            <th class="col-xs-3">ID log</th>
            <th class="col-xs-3">ID tarea</th>
            <th class="col-xs-3">ID estado</th>
            <th class="col-xs-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table_childs" v-for="(logTarea,index) in logTareas" :key="index">
            <td class="col-xs-3">{{logTarea.id}}</td>
            <td class="col-xs-3">{{logTarea.id_tarea}}</td>
            <td class="col-xs-3">{{logTarea.id_estado}}</td>
            <td class="col-xs-3">{{logTarea.fecha}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {

  name: 'log-tarea',
  data(){
    return {
      logTareas: []
    }
  },
  methods:{
    obtenerLogTarea() {
      this.$http.get("/logtarea").then(response => {
        this.logTareas = response.data
      }).catch(error => {console.log(error.message)})
    },
    actualizarTarea() {
      this.$http.get("/logtarea/addrandom")
        .then(this.obtenerLogTarea())
        .catch(error => {console.log(error.message)})
    }
  },
  beforeMount(){
    this.obtenerLogTarea();
  }

}
</script>
<style>
  @import '../style/table.css';
</style>
