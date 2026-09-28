<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'

const route = useRoute()
const store = useProductsStore()
const product = computed(() => store.products.find((item) => String(item.id) === String(route.params.id)))

onMounted(() => {
  if (!product.value) store.loadProduct(String(route.params.id))
})
</script>

<template>
  <main class="detail-page">
    <RouterLink class="back-link" to="/">← Назад в каталог</RouterLink>
    <div v-if="store.detailLoading" class="loading-state">Загружаем карточку…</div>
    <p v-else-if="store.error" class="error-box" role="alert">{{ store.error }}</p>
    <section v-else-if="product" class="detail-layout">
      <div class="detail-image"><img :src="product.images[0] || product.thumbnail" :alt="product.title" /></div>
      <div class="detail-copy">
        <p class="kicker">{{ product.brand || 'FORM & FIELD' }} / {{ product.category.replaceAll('-', ' ') }}</p>
        <h1>{{ product.title }}</h1>
        <p class="detail-rating">★ {{ product.rating.toFixed(1) }} <span>·</span> {{ product.stock }} единиц в наличии</p>
        <p class="detail-description">{{ product.description }}</p>
        <div class="detail-price">${{ product.price.toFixed(2) }} <span v-if="product.discountPercentage">— {{ Math.round(product.discountPercentage) }}% скидка</span></div>
        <button class="primary-button" @click="store.toggleFavorite(product.id)">{{ store.favorites.includes(product.id) ? '♥ В избранном' : '♡ Добавить в избранное' }}</button>
        <p class="api-note">Товар загружен по REST-маршруту <code>/products/{{ product.id }}</code>.</p>
      </div>
    </section>
    <div v-else class="loading-state">Товар не найден.</div>
  </main>
</template>
