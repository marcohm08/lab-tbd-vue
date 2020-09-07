<template>
  <div class="home">
      <h1>Mapa de Voluntarios</h1>
      <div>{{point}}
          <input type="text" v-model="name" placeholder="nombre">
          <button type="button" @click="createPoint">Crear</button>
      </div>
      <div>
          {{message}}
      </div>
      <div id="mapid"></div>
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
var myIcon = new LeafIcon({iconUrl: icon});

export default {
    data(){
    return {
      latitude: null,
      longitude: null,
      name: '',
      voluntaries:[],
      message:'',
      mymap:null
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
          this.points.forEach(p =>{
              this.mymap.removeLayer(p);
          })
          this.points = [];
      },
      /* async createPoint(){
          this.message = '';

          let newPoint={
              name: this.name,
              latitude: this.latitude,
              longitude: this.longitude
          }

          this.$http.post('/punto',newPoint).then(response =>{
              let id = response.data.id;
          })
      } */

      async getVoluntarios(){
          this.$http.get("/voluntario").then(response => {
            this.voluntaries = response.data
            this.voluntaries.forEach(voluntary => {

                let p = [voluntary.latitude, voluntary.longitude]
                let marker = L.marker(p,{icon:myIcon})
                .bindPopup(voluntary.name)

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