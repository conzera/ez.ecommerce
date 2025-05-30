
<template>
  <nav class="fixed top-0 w-full bg-blue-600 text-white py-4 px-8 flex justify-between items-center z-50 shadow-2xl">
    <div class="flex font-bold items-center gap-6">
      <li class="flex flex-col items-center hover:text-green-500">
        <router-link to="/" class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>Início</span>
        </router-link>
      </li>
      <div>
        <router-link to="/about" class="font-bold leading-tight text-green-500">
          <span class="text-5xl block">EZ</span>
          <span class="block whitespace-nowrap">e-commerce</span>
        </router-link>
      </div>
    </div>

    <!-- campo de busca -->
    <div class="ml-20 mx-8 w-60 flex items-center bg-gray-800 rounded overflow-hidden px-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Pesquisar..."
        class="flex-grow p-1 text-white bg-transparent outline-none"
      />
    </div>

    <ul class="flex font-bold items-center gap-6">
      <li class="hover:text-green-500">
        <router-link to="/about" class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span>Sobre</span>
        </router-link>
      </li>
      <li class="hover:text-green-500">
        <router-link to="/contact" class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <span>Contato</span>
        </router-link>
      </li>
      <li class="hover:text-green-500">
        <router-link to="/cart" class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span>Carrinho</span>
        </router-link>
      </li>
    </ul>
  </nav>

  <!-- resultados da busca -->
  <div class="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-blue-600 text-white mt-4 p-4 rounded shadow-2xl z-40" v-if="products.length">
    <h2 class="font-bold mb-2 mr-2 ml-2">Resultados:</h2>
    <ul>
      <li 
        v-for="product in products" 
        :key="product.id" 
        class="mr-2 border-b border-gray-800 py-2 cursor-pointer hover:rounded hover:bg-green-700"
        @click="goToProduct(product.id)"
      >
        <div class="ml-2">
            {{ product.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<!------------------------------------------------------------------------------->

<script setup>
    import { ref, watch } from 'vue'
    import { useRouter } from 'vue-router'

    const searchQuery = ref('')
    const products = ref([])

    const router = useRouter()

    const goToProduct = (id) => {
    products.value = []
    router.push({ path: '/product', query: { id } })
    }

    watch(searchQuery, async (newQuery) => {
    if (newQuery.trim() === '') {
        products.value = []
        return
    }

    try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(newQuery)}`)
        const data = await res.json()
        products.value = data.products
    } catch (err) {
        console.error('Erro ao buscar produtos:', err)
    }
    })
</script>
