import { defineStore } from 'pinia'
import { getProduct, getProducts } from '../services/productsApi'
import type { Product } from '../types'

interface ProductState {
  products: Product[]
  favorites: number[]
  loading: boolean
  detailLoading: boolean
  error: string
  query: string
  category: string
}

export const useProductsStore = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    favorites: [],
    loading: false,
    detailLoading: false,
    error: '',
    query: '',
    category: 'all',
  }),

  getters: {
    categories: (state): string[] => [...new Set(state.products.map((product) => product.category))].sort(),
    favoriteCount: (state): number => state.favorites.length,
    filteredProducts: (state): Product[] => state.products.filter((product) => {
      const matchesText = `${product.title} ${product.brand} ${product.category}`
        .toLowerCase()
        .includes(state.query.trim().toLowerCase())
      const matchesCategory = state.category === 'all' || product.category === state.category
      return matchesText && matchesCategory
    }),
  },

  actions: {
    async loadProducts(): Promise<void> {
      if (this.products.length) return
      this.loading = true
      this.error = ''
      try {
        this.products = await getProducts()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки каталога.'
      } finally {
        this.loading = false
      }
    },

    async loadProduct(id: string): Promise<void> {
      this.detailLoading = true
      this.error = ''
      try {
        const product = await getProduct(id)
        if (!this.products.some((item) => item.id === product.id)) this.products.push(product)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Товар не найден.'
      } finally {
        this.detailLoading = false
      }
    },

    toggleFavorite(id: number): void {
      this.favorites = this.favorites.includes(id)
        ? this.favorites.filter((favoriteId) => favoriteId !== id)
        : [...this.favorites, id]
    },
  },
})
