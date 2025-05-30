
<!-- tive problemas pra unificar os códigos: -->
<!-- ProductsListComponent, CategoryComponent e SortComponent -->
<!-- todo vez que edito um dos arquivos, -->
<!-- preciso replicar manualmente a alteração nos demais -->

<template>
  <div class="relative mb-5">

    <!-------------------------------------------------------------->

    <div class="text-white text-center mt-3 mb-1">
      Página {{ currentPage }} de {{ totalPages }}
    </div>

    <div class="flex justify-center gap-3 items-center">
      <button
        @click="prevPage"
        class="btn bg-gray-700 text-white px-2 py-1 rounded border border-gray-700 hover:bg-blue-600 disabled:text-gray-400 disabled:bg-gray-800"
        :disabled="offset <= 0"
      >
        &lt; Anterior
      </button>

      <button
        @click="nextPage"
        class="btn bg-gray-700 text-white px-2 py-1 rounded border border-gray-700 hover:bg-blue-600 disabled:text-gray-400 disabled:bg-gray-800"
        :disabled="offset + limit >= total"
      >
        Próxima &gt;
      </button>

      <button
        @click="mostrarCategorias"
        class="btn bg-green-700 text-white px-3 py-1 rounded hover:bg-blue-600 absolute left-2 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"/>
        </svg>
        Categorias
      </button>
      <button
        @click="mostrarOrdens"
        class="btn bg-gray-700 text-white px-3 py-1 rounded hover:bg-blue-600 absolute right-2 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
        </svg>
        Ordenar por
      </button>
    </div>
  </div>

  <!-------------------------------------------------------------->

  <div
    v-if="modalAbertaCategoria"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="fecharModalCategoria"
  >
    <div class="bg-gray-800 rounded-lg p-4 max-w-sm w-full shadow-2xl text-white">
      <h2 class="text-xl font-semibold mb-4">Categorias:</h2>
      <ul class="divide-y divide-gray-700 max-h-60 overflow-y-auto">
        <li
          class="py-2 cursor-pointer capitalize rounded px-2"
          :class="[
            categoriaSelecionadaTemp === ''
              ? 'font-bold bg-green-600'
              : 'hover:bg-blue-600'
          ]"
          @click="categoriaSelecionadaTemp = ''"
        >
          Todas
        </li>

        <li
          v-for="cat in categorias"
          :key="cat.slug"
          class="py-2 cursor-pointer capitalize rounded px-2"
          :class="[
            categoriaSelecionadaTemp === cat.slug
              ? 'font-bold bg-green-600'
              : 'hover:bg-blue-600'
          ]"
          @click="categoriaSelecionadaTemp = cat.slug"
        >
          {{ cat.name }}
        </li>
      </ul>

      <div class="flex justify-between items-center mt-4 w-full">
        <button
          @click="fecharModalCategoria"
          class="px-3 py-1 bg-gray-600 rounded hover:bg-blue-600 transition"
        >
          Voltar
        </button>
        <button
          @click="confirmarCategoria"
          class="px-4 py-2 bg-green-700 rounded hover:bg-green-600 transition border border-gray-700 disabled:text-gray-400 disabled:bg-gray-800"
          :disabled="categoriaSelecionadaTemp === categoriaSelecionada"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>

  <!-------------------------------------------------------------->

  <div
    v-if="modalAbertaOrdem"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="fecharModalOrdem"
  >
    <div class="bg-gray-800 rounded-lg p-4 max-w-sm w-full shadow-2xl text-white">
      <h2 class="text-xl font-semibold mb-4">Classificar por:</h2>
      <ul class="divide-y divide-gray-700 max-h-60 overflow-y-auto">
        <li
          class="py-2 cursor-pointer capitalize rounded px-2"
          :class="[
            ordemSelecionadaTemp === ''
              ? 'font-bold bg-green-600'
              : 'hover:bg-blue-600'
          ]"
          @click="ordemSelecionadaTemp = ''"
        >
          Padrão
        </li>

        <li
          v-for="ord in ordens"
          :key="ord.value"
          class="py-2 cursor-pointer capitalize rounded px-2"
          :class="[
            ordemSelecionadaTemp === ord.value
              ? 'font-bold bg-green-600'
              : 'hover:bg-blue-600'
          ]"
          @click="ordemSelecionadaTemp = ord.value"
        >
          {{ ord.label }}
        </li>
      </ul>
      <div class="flex justify-between items-center mt-4 w-full">
        <button
          @click="fecharModalOrdem"
          class="px-3 py-1 bg-gray-600 rounded hover:bg-blue-600 transition"
        >
          Voltar
        </button>
        <button
          @click="confirmarOrdem"
          class="px-4 py-2 bg-green-700 rounded hover:bg-green-600 transition border border-gray-700 disabled:text-gray-400 disabled:bg-gray-800"
          :disabled="ordemSelecionadaTemp === ordemSelecionada"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>

  <!-------------------------------------------------------------->

  <div>
    <div v-if="loading" class="text-white text-center mb-4"></div>
    <div v-if="error" class="text-white text-center mb-4">{{ error }}</div>

    <ul
      v-if="products.length"
      class="gap-4 grid justify-center"
      style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"
    >
      <li
        v-for="product in products"
        :key="product.id"
        class="cursor-pointer rounded-lg p-4 shadow-md bg-gray-800 hover:bg-green-800 hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-between text-center min-h-[310px]"
        @click="goToProductDetail(product.id)"
      >
        <p class="text-lg font-semibold capitalize">{{ product.title }}</p>
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="mx-auto rounded object-contain h-[150px]"
        />
        <div class="flex items-center justify-center gap-1">
          <p class="font-semibold text-white">R$</p>
          <p class="text-3xl font-bold text-green-500">{{ formatPrice(product.price) }}</p>
        </div>
      </li>
    </ul>
  </div>

  <!-------------------------------------------------------------->

  <div class="relative mt-5">
    <div class="flex justify-center gap-3 items-center ">
      <button
        @click="prevPage"
        class="btn bg-gray-700 text-white px-2 py-1 border border-gray-700 rounded hover:bg-blue-600 disabled:text-gray-400 disabled:bg-gray-800"
        :disabled="offset <= 0"
      >
        &lt; Anterior
      </button>

      <button
        @click="nextPage"
        class="btn bg-gray-700 text-white px-2 py-1 border border-gray-700 rounded hover:bg-blue-600 disabled:text-gray-400 disabled:bg-gray-800"
        :disabled="offset + limit >= total"
      >
        Próxima &gt;
      </button>
    </div>
    
    <div class="text-white text-center mt-1">
      Página {{ currentPage }} de {{ totalPages }}
    </div>
  </div>
</template>

<!-------------------------------------------------------------->

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  //////////////////////////////////////////////////////

  const offset = ref(0)
  const limit = 30
  const total = ref(0)
  const currentPage = computed(() => Math.floor(offset.value / limit) + 1)
  const totalPages = computed(() => Math.ceil(total.value / limit))

  const prevPage = () => {
    if (offset.value > 0) {
      offset.value -= limit
      fetchProducts()
    }
  }

  const nextPage = () => {
    if (offset.value + limit < total.value) {
      offset.value += limit
      fetchProducts()
    }
  }

  //////////////////////////////////////////////////////

  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const formatPrice = (value) => {
    const parts = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).formatToParts(value)
    return parts
      .filter((p) => p.type !== 'currency' && !(p.type === 'literal' && p.value.trim() === ''))
      .map((p) => p.value)
      .join('')
  }

  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      let url = ''
      if (categoriaSelecionada.value === '') {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${offset.value}`
      } else {
        url = `https://dummyjson.com/products/category/${categoriaSelecionada.value}?limit=${limit}&skip=${offset.value}`
      }

      const res = await axios.get(url)

      products.value = res.data.products
      total.value = res.data.total

    } catch (err) {
      error.value = 'Erro ao carregar produtos.'
    } finally {
      loading.value = false
    }
  }

  //////////////////////////////////////////////////////

  const categorias = ref([])
  const modalAbertaCategoria = ref(false)
  const categoriaSelecionada = ref('')
  const categoriaSelecionadaTemp = ref('')

  const fetchCategorias = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products/categories')
      categorias.value = res.data
    } catch (err) {
      error.value = 'Erro ao carregar categorias.'
    }
  }

  const mostrarCategorias = async () => {
    await fetchCategorias()
    categoriaSelecionadaTemp.value = categoriaSelecionada.value
    modalAbertaCategoria.value = true
  }

  const fecharModalCategoria = () => {
    modalAbertaCategoria.value = false
  }

  const confirmarCategoria = () => {
    if (categoriaSelecionada.value !== categoriaSelecionadaTemp.value) {
      categoriaSelecionada.value = categoriaSelecionadaTemp.value
      offset.value = 0
      fetchProducts()
      goToProductCategory(categoriaSelecionada.value)
    }
    fecharModalCategoria()
  }

  //////////////////////////////////////////////////////

  const ordens = ref([
  { label: 'Nome A-Z', value: { sortBy: 'title', order: 'asc' } },
  { label: 'Nome Z-A', value: { sortBy: 'title', order: 'desc' } },
  { label: 'Menor preço', value: { sortBy: 'price', order: 'asc' } },
  { label: 'Maior Preço', value: { sortBy: 'price', order: 'desc' } }
  ])
  const produtosOrdenados = ref([])
  const modalAbertaOrdem = ref(false)
  const ordemSelecionada = ref('')
  const ordemSelecionadaTemp = ref('')

  const fetchOrdens = async () => {
    try {
      let url = 'https://dummyjson.com/products'

      if (ordemSelecionada.value) {
        const { sortBy, order } = ordemSelecionada.value
        url += `?sortBy=${sortBy}&order=${order}`
      }

      const res = await axios.get(url)
      produtosOrdenados.value = res.data.products
    } catch (err) {
      error.value = 'Erro ao carregar produtos.'
    }
  }

  const mostrarOrdens = async () => {
    await fetchOrdens()
    ordemSelecionadaTemp.value = ordemSelecionada.value
    modalAbertaOrdem.value = true
  }

  const fecharModalOrdem = () => {
    modalAbertaOrdem.value = false
  }

  const confirmarOrdem = () => {
    if (JSON.stringify(ordemSelecionada.value) !== JSON.stringify(ordemSelecionadaTemp.value)) {
      ordemSelecionada.value = ordemSelecionadaTemp.value
      offset.value = 0
      fetchOrdens()
      goToProductSort(ordemSelecionada.value)
    }
    fecharModalOrdem()
  }

  //////////////////////////////////////////////////////

  const router = useRouter()

  const goToProductDetail = (id) => {
    router.push({
      path: '/product',
      query: { id }
    })
  }

  const goToProductCategory = (slug) => {
    router.push({
      path: '/category',
      query: { slug }
    })
  }

  const goToProductSort = (value) => {
    router.push({
      path: '/sort',
      query: { sortBy: value.sortBy, order: value.order }
    })
  }

  onMounted(() => {
    fetchProducts()
  })
</script>
