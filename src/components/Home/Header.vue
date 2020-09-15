<template>
<header>
  <nav>
    <div class="row-custom header-links">
      <div class="logo">
          <router-link to="/">Servicio Voluntarios</router-link>
      </div>
      <ul class="main-nav" >
        <li>  
          <a class="btn-custom btn-full">
            <router-link to="/">Home</router-link>
          </a>
        </li>
        <li>
          <a class="btn-custom btn-full">
            <router-link to="/about"> 
              Sobre nosotros
            </router-link>
          </a>
        </li>
        <li>
          <a class="btn-custom btn-full">
            <router-link to="/vol-habilidad">Habilidad de voluntario</router-link>
          </a>
        </li>
        <li >
          <a class="btn-custom btn-full">
            <router-link to="/vol-eme-hab">Voluntarios</router-link>
          </a>
        </li>
        <li >
          <a class="btn-custom btn-full">
            <router-link to="/log-tarea">Tareas</router-link>
          </a>
        </li>
        <li >
          <a class="btn-custom btn-full">
            <router-link to="/vol-geo">Emergencias</router-link>
          </a>
        </li>
      </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->
    </div>
  </nav>
</header>
</template>

<script>
export default {
    data(){
      return {
        active: ''
      }
    }

}
</script>

