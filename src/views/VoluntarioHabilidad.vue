<template>
    <div class=" container mt-5">
        <h2 class="mb-3">Busqueda de voluntario segun habilidad </h2>
        <div class="row mx-5 my-3">
            <input type="text" placeholder="Ingrese id de la habilidad" class="form-control mx-3" style="width: 50%" v-model="idHabilidad">
            <button class="btn btn-primary" @click="obtenerVoluntarios(idHabilidad)">Buscar</button>
        </div>
        <div v-if="voluntarios.length != 0">
            <table class="table table-fixed">
                <thead>
                <tr class="table_title">
                    <th class="col-xs-3">Nombre</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table_childs" v-for="(voluntario,index) in voluntarios" :key="index">
                    <td class="col-xs-3">{{voluntario.nombre}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'VoluntarioHabilidad',
        data(){
            return {
                nombreHabilidad: '',
                voluntarios: []
            }
        },
        methods:{
            obtenerVoluntarios(id){
                if(id != ''){
                    this.$http.get("voluntario/habilidad/"+ id).then(response => {
                        this.voluntarios = response.data
                    }).catch(error => {console.log(error.message)})

                }
            }
        }


    }
</script>
