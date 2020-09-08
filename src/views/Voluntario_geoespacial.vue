<template>
  <div class="container">
      <h1 class="mt-5">Mapa de Emergencias</h1>
      <div>
          {{message}}
      </div>
      <div class="my-3" id="mapid"></div>
      <div v-if="voluntaries.length !== 0">
          <span>Ranking de voluntarios mas cercanos a {{emergencia_actual}}</span>
            <table class="table table-striped table-bordered table-sm mt-3" cellspacing="0" width="100%">
                <thead>
                <tr class="table_title">
                    <th class="col-xs-3">Ranking</th>
                    <th class="col-xs-3">Identificador</th>
                    <th class="col-xs-3">Nombre</th>
                    <th class="col-xs-3">Apellido</th>
                    <th class="col-xs-3">latitud</th>
                    <th class="col-xs-3">longitud</th>
                    <th class="col-xs-3">Distancia</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table_childs" v-for="(voluntario,index) in voluntaries" :key="index">
                    <td class="col-xs-3">{{index + 1}}</td>
                    <td class="col-xs-3">{{voluntario.id}}</td>
                    <td class="col-xs-3">{{voluntario.nombre}}</td>
                    <td class="col-xs-3">{{voluntario.apellido}}</td>
                    <td class="col-xs-3">{{voluntario.latitude}}</td>
                    <td class="col-xs-3">{{voluntario.longitude}}</td>
                    <td class="col-xs-3">{{voluntario.distancia}}</td>
                </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
var icon = require('leaflet/dist/images/marker-icon.png')
var LeafIcon = L.Icon.extend({
    options: {iconSize:[25,41], iconAnchor:[12,41],popupAnchor:[-3,-41]}
});
var RedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [-3,-41],
  shadowSize: [41, 41]
});

var myIcon = new LeafIcon({iconUrl: icon});

export default {
    data(){
    return {
      latitude: null,
      longitude: null,
      name: '',
      voluntaries:[],
      vPoints: [],
      emergencias:[],
      points:[],
      message:'',
      mymap:null,
      emergencia_actual: ''
    }
  },
  computed:{
      point(){
          if(this.latitude && this.longitude){
              let lat = this.latitude.toFixed(3);
              let lon = this.longitude.toFixed(3);
              return `(${lat}, ${lon})`;
          } else {
              return '';
          }
      }
  },
  methods: {
      clearMarkers(){
          this.voluntaries.forEach(p =>{
              this.mymap.removeLayer(p);
          })
          this.voluntaries = [];
      },
      nearVoluntiers(emergencyId){

          console.log("hola")

          this.clearMarkers()

          this.$http.get("/voluntario/dist/"+emergencyId).then(response =>{
              this.voluntaries = response.data
              this.voluntaries = this.voluntaries.slice(0,20)
          })

          
      },


      async getEmergencias(){
          let _this = this
          this.$http.get("/emergencia").then(response => {
            this.emergencias = response.data
            this.emergencias.forEach(emergencia => {

                let p = [emergencia.latitude, emergencia.longitude]
                let marker = L.marker(p,{icon:myIcon})
                .bindPopup(emergencia.nombre).on('click', function(){
                    _this.emergencia_actual = emergencia.nombre
                    _this.vPoints.forEach(p =>{
                        _this.mymap.removeLayer(p);
                    })
                    _this.voluntaries = [];
                    _this.vPoints = []

                    _this.$http.get("/voluntario/dist/"+emergencia.id).then(response =>{
                        _this.voluntaries = response.data
                        _this.voluntaries = _this.voluntaries.slice(0,20)
                        _this.voluntaries.forEach(voluntario =>{

                            let v = [voluntario.latitude, voluntario.longitude]
                            let vmarker = L.marker(v,{icon:RedIcon}).bindPopup(voluntario.nombre+' '+voluntario.apellido+': '+voluntario.distancia)
                            _this.vPoints.push(vmarker)

                            _this.vPoints.forEach(vp =>{
                                vp.addTo(_this.mymap)
                            })

                        })
                    })

                })

                this.points.push(marker)
            });

            this.points.forEach(p =>{
                p.addTo(this.mymap)
            })

            }).catch(error => {console.log(error.message)})
      }
  },
  mounted(){
    let _this = this
    this.mymap = L.map('mapid').setView([-38.719, -72.478], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 10
    }).addTo(this.mymap);

    this.mymap.on('click',function(e){
        _this.latitude = e.latlng.lat
        _this.longitude = e.latlng.lng
    });

    _this.getEmergencias()



    /* var marker = L.marker([-51.760928, -72.482996]).addTo(this.mymap);

    var circle = L.circle([-34.1708, -70.7444], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 15000
    }).addTo(this.mymap); */
    }

}
</script>

<style>

</style>