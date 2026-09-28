<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useProductsStore } from './stores/products'

const store = useProductsStore()
</script>

<template>
  <div class="app-frame">
    <header class="topbar">
      <RouterLink class="wordmark" to="/">
        <span class="wordmark-icon">F</span>
        <span>FORM <i>&</i> FIELD</span>
      </RouterLink>
      <nav class="nav-links">
        <RouterLink to="/">Каталог</RouterLink>
        <RouterLink to="/about">О проекте</RouterLink>
      </nav>
      <div class="header-note"><span class="green-dot"></span> Коллекция 2026 <span class="favorite-total">♡ {{ store.favoriteCount }}</span></div>
    </header>
    <RouterView />
    <footer class="footer"><span>FORM & FIELD</span><span>Демо-каталог · данные из REST API</span></footer>
  </div>
</template>
