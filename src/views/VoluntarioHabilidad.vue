<template>
    <div class=" container mt-5">
        <h2 class="mb-3"> voluntario - habilidad </h2>
        <div class="row mx-5 my-3">
            <input type="text" placeholder="Ingrese id de la habilidad" class="form-control mx-3" style="width: 50%" v-model="idHabilidad">
            <input type="text" placeholder="Ingrese id del voluntario" class="form-control mx-3" style="width: 50%" v-model="idVoluntario">
            <!--button class="btn btn-primary" @click="crearVolHabilidad(id, idHabilidad, idVoluntario)">Crear</button-->
        </div>
        <div class="row mx-5 my-3">
            <button class="btn btn-primary" @click="crearVolHabilidad(idHabilidad, idVoluntario)">Crear</button>
        </div>
        {{ db }}
    </div>
</template>

<script>


    export default {
        name: 'Voluntario-Habilidad',
        data(){
            return {
                db: ''
            }
        },
        methods:{
            crearVolHabilidad(idHabilidad, idVoluntario){
                if(idHabilidad != '' && idVoluntario != ''){
                  this.$http.post("/parallel/vol-habilidad/" + idHabilidad +"/"+ idVoluntario).then(response => {
                      this.db = "El dato ha sido almacenado en la base de datos "+ response.data
                  }).catch(error => {console.log(error.message)})
                }
            }
        }


    }
</script>
