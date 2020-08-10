<template>
    <div class=" container mt-5">
        <h2 class="mb-3">Busqueda de voluntario según emergencia y/o habilidad</h2>
        <div class="row mb-3 mt-5 d-flex justify-content-between">
          <select v-model="buscarPor">
            <option>Todos</option>
            <option>Emergencia</option>
            <option>Habilidad</option>
          </select>
          <div v-if="buscarPor == 'Emergencia'" class="row">
            <input type="text" placeholder="Emergencia" class="form-control mx-3" style="width: 50%" v-model="nombreEmergencia">
            <button class="btn btn-success" @click="obtenerVoluntariosEmergencia(nombreEmergencia)">Buscar</button>
          </div>
          <div v-if="buscarPor == 'Habilidad'" class="row">
            <input type="text" placeholder="Id habilidad" class="form-control mx-3" style="width: 50%" v-model="idHabilidad">
            <button class="btn btn-success" @click="obtenerVoluntarios(idHabilidad)">Buscar</button>
          </div>
            <!-- <input type="text" placeholder="Ingrese nombre de la emergencia" class="form-control mx-3" style="width: 50%" v-model="nombreEmergencia">
            <input type="text" placeholder="Ingrese nombre de la habilidad" class="form-control mx-3" style="width: 50%" v-model="idHabilidad">
            <button class="btn btn-primary" @click="obtenerVoluntarios(nombreEmergencia, idHabilidad)">Buscar</button> -->
        </div>
        <div v-if="voluntarios.length !== 0">
            <table class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                <tr class="table_title">
                    <th class="col-xs-3">Identificador</th>
                    <th class="col-xs-3">Nombre</th>
                    <th class="col-xs-3">Fecha de nacimiento</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table_childs" v-for="(voluntario,index) in displayedPosts" :key="index">
                    <td class="col-xs-3">{{voluntario.id}}</td>
                    <td class="col-xs-3">{{voluntario.nombre}}</td>
                    <td class="col-xs-3">{{voluntario.fnacimiento}}</td>
                </tr>
                </tbody>
            </table>
            <pagination class="my-3" 
            :current-page="paginaActual" 
            :pageCount="dinamicPages"
            @nextPage="cambiaPagina('siguiente')"
            @previousPage="cambiaPagina('anterior')"
            @loadPage="cambiaPagina" />
        </div>
    </div>
</template>

<script>
  import BasePagination from '@/components/Pagination/BasePagination.vue'
  export default {
    components:{
      'pagination': BasePagination
    },
    name: 'voluntario-habilidad',
    data(){
        return {
            nombreEmergencia: '',
            idHabilidad: '',
            voluntarios: [],
            paginaActual: 1,
            cantidadPorPagina: 10,
            cuentaPagina:5,
            buscarPor: ''
        }
    },
    methods:{
        obtenerVoluntarios(nombre, id){
            if(nombre !== '' && id === ''){
                this.$http.get("/voluntario/nombre-emergencia/"+nombre).then(response => {
                    this.voluntarios = response.data
                }).catch(error => {console.log(error.message)})
            }
            else if(nombre === '' & id !== ''){
                this.$http.get("/voluntario/habilidad/"+id).then(response => {
                    this.voluntarios = response.data
                }).catch(error => {console.log(error.message)})
            }
            else{
                this.$http.get("/voluntario/emergencia/"+nombre+"/habilidad/"+id).then(response => {
                    this.voluntarios = response.data
                }).catch(error => {console.log(error.message)})
            }
        },
        obtenerVoluntariosEmergencia(nombre){
          this.$http.get("/voluntario/nombre-emergencia/"+nombre).then(response => {
              this.voluntarios = response.data
          }).catch(error => {console.log(error.message)})
        },
        obtenerVoluntariosHabilidad(id){
          this.$http.get("/voluntario/habilidad/"+id).then(response => {
              this.voluntarios = response.data
          }).catch(error => {console.log(error.message)})
        },
        async cambiaPagina(valor){
            switch (valor) {
                case 'siguiente':
                    this.paginaActual += 1
                    break
                case 'anterior':
                    this.paginaActual -= 1
                    break
                default:
                    this.paginaActual = valor
            }
        },
        paginarVoluntarios(voluntarios){
          if(voluntarios.length % this.cuentaPagina == 0){
            let pagina = this.paginaActual
            let porPagina = this.cantidadPorPagina
            let desde = (pagina * porPagina) - porPagina
            let hasta
            if(pagina * porPagina > voluntarios.length - 1){
              hasta = voluntarios.length
            }
            else {
              hasta = pagina * porPagina
            }
            return voluntarios.slice(desde,hasta)
          } else {
            let pagina = this.paginaActual
            let porPagina = this.cantidadPorPagina + 1
            let desde = (pagina * porPagina) - porPagina
            let hasta
            if(pagina * porPagina > voluntarios.length - 1){
              hasta = voluntarios.length
            }
            else {
              hasta = pagina * porPagina
            }
            return voluntarios.slice(desde,hasta)
          }

        }
    },
    computed: {
      displayedPosts() {
        return this.paginarVoluntarios(this.voluntarios);
      },
      dinamicPages(){
        return Math.floor(this.voluntarios.length/this.cantidadPorPagina) + 1
      }
    },
    created(){
        this.$http.get("/voluntario").then(response => {
            this.voluntarios = response.data
            this.cuentaPagina = Math.floor(this.voluntarios.length/this.cantidadPorPagina)
        }).catch(error => {console.log(error.message)})
    },
    watch: {
      buscarPor: function(){
        if(this.buscarPor == 'Todos'){
          this.$http.get("/voluntario").then(response => {
            this.voluntarios = response.data
          }).catch(error => {console.log(error.message)})
        }
      },
      voluntarios: function(){
        this.paginaActual = 1
      }
    }


  }
</script>
<style>
  @import '../style/table.css';
</style>
