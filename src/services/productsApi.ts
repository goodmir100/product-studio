import type { Product, ProductResponse } from '../types'

const API_URL = 'https://dummyjson.com/products'

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Не удалось получить данные (${response.status}).`)
  return response.json() as Promise<T>
}

export async function getProducts(): Promise<Product[]> {
  const data = await request<ProductResponse>(`${API_URL}?limit=30`)
  return data.products
}

export function getProduct(id: string | number): Promise<Product> {
  return request<Product>(`${API_URL}/${encodeURIComponent(id)}`)
}
