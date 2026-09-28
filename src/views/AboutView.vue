<template>
  <main class="about-page">
    <p class="kicker">ABOUT THE PROJECT</p>
    <h1>Небольшой каталог<br /><em>с типами на каждом шаге.</em></h1>
    <p>FORM & FIELD — демонстрационное приложение, которое показывает типизированные модели данных, состояние Pinia и маршруты Vue Router.</p>
    <div class="about-stack"><span>Vue 3 + TypeScript</span><span>Vue Router</span><span>Pinia</span><span>DummyJSON REST API</span></div>
    <RouterLink class="text-link" to="/">← Вернуться к каталогу</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
