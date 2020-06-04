<template>
  <nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="#">Servicio Voluntarios</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item " :class="(active == '') ? 'active' : ''">  
        <a class="nav-link">
          <router-link to="/">Home</router-link>
        </a>
      </li>
      <li class="nav-item" :class="(active == 'about') ? 'active' : ''">
        <a class="nav-link" href="#">
          <router-link to="/about"> 
            Sobre nosotros
          </router-link>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Voluntarios</a>
      </li>
    </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->
  </div>
</nav>
</template>

<script>
export default {
    name: 'header',
    data(){
      return {
        active: ''
      }
    }

}
</script>

