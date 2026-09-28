<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductsStore } from '../stores/products'

const store = useProductsStore()
onMounted(() => store.loadProducts())

function formatCategory(value: string): string {
  return value.replaceAll('-', ' ')
}
</script>

<template>
  <main class="catalog-page">
    <section class="hero">
      <div class="hero-copy">
        <p class="kicker">ПОДБОРКА ДЛЯ ДОМА И ЖИЗНИ</p>
        <h1>Вещи, которые<br /><em>остаются с вами.</em></h1>
        <p class="hero-text">Продуманные находки для повседневных ритуалов. Исследуйте нашу небольшую подборку.</p>
      </div>
      <div class="hero-art"><span class="sun"></span><span class="vase vase-one"></span><span class="vase vase-two"></span><span class="hero-art-caption">OBJECTS<br />FOR SLOW LIVING</span></div>
    </section>

    <section class="collection-head">
      <div><p class="kicker">THE EDIT / 01</p><h2>Каталог <span>{{ store.filteredProducts.length.toString().padStart(2, '0') }}</span></h2></div>
      <label class="search-field"><span>⌕</span><input v-model="store.query" type="search" placeholder="Поиск по каталогу" aria-label="Поиск по каталогу" /></label>
    </section>

    <div class="catalog-layout">
      <aside class="category-list">
        <p class="filter-label">КАТЕГОРИЯ</p>
        <button :class="{ selected: store.category === 'all' }" @click="store.category = 'all'">Все предметы</button>
        <button v-for="category in store.categories" :key="category" :class="{ selected: store.category === category }" @click="store.category = category">{{ formatCategory(category) }}</button>
      </aside>

      <div class="product-area">
        <p v-if="store.error" class="error-box" role="alert">{{ store.error }} <button @click="store.loadProducts()">Повторить</button></p>
        <div v-if="store.loading" class="loading-state">Загружаем коллекцию…</div>
        <div v-else-if="store.filteredProducts.length" class="product-grid">
          <article v-for="product in store.filteredProducts" :key="product.id" class="product-card">
            <RouterLink class="product-image" :to="{ name: 'product', params: { id: product.id } }">
              <img :src="product.thumbnail" :alt="product.title" loading="lazy" />
              <span class="image-label">{{ formatCategory(product.category) }}</span>
            </RouterLink>
            <button class="favorite-button" :aria-label="store.favorites.includes(product.id) ? 'Убрать из избранного' : 'В избранное'" @click="store.toggleFavorite(product.id)">{{ store.favorites.includes(product.id) ? '♥' : '♡' }}</button>
            <div class="product-info">
              <div><p class="product-brand">{{ product.brand || 'FORM & FIELD' }}</p><RouterLink class="product-title" :to="{ name: 'product', params: { id: product.id } }">{{ product.title }}</RouterLink></div>
              <strong>${{ product.price.toFixed(2) }}</strong>
            </div>
            <div class="product-meta"><span>★ {{ product.rating.toFixed(1) }}</span><span>{{ product.stock }} в наличии</span></div>
          </article>
        </div>
        <div v-else class="loading-state">Ничего не найдено — измени поиск или категорию.</div>
      </div>
    </div>
  </main>
</template>
