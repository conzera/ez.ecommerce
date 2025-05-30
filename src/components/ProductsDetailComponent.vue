
<template>
  <div class="max-w-3xl w-full mx-auto">
    <!-- botões acima da box -->
    <div class="flex justify-between items-center mt-3 mb-4 w-full text-white">
      <button
        @click="goBack"
        class="btn rounded bg-gray-600 hover:bg-blue-600 px-3 py-1 text-white text-center transition-colors"
      >
        Voltar
      </button>

      <button
        @click="comprar"
        class="btn rounded text-lg bg-green-700 hover:bg-green-600 px-4 py-2 text-white text-center transition-colors"
      >
        Comprar
      </button>

      <!-- modal de compra -->
      <div 
        v-if="mostrarAlertaCompra" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-gray-800 rounded-lg p-4 max-w-sm shadow-2xl text-white">
          <h2 class="text-xl font-semibold mb-4">Produto adicionado ao Carrinho!</h2>
          <p class="mb-6">Carrinho em desenvolvimento...</p>
          <button 
            @click="mostrarAlertaCompra = false" 
            class="btn rounded bg-gray-600 hover:bg-blue-600 px-3 py-1 text-white text-center transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>

    <!-- conteúdo do produto -->
    <div v-if="loading" class="text-white text-center"></div>
    <div v-else-if="error" class="text-white text-center">{{ error }}</div>

    <div
      v-else
      id="product-details"
      class="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-white"
    >
      <div class="flex items-center justify-center gap-1 mb-6">
        <p class="font-semibold text-white">R$</p>
        <p class="text-3xl font-bold text-green-500">{{ formatPrice(product.price) }}</p>
      </div>

      <h1 class="text-2xl font-bold mb-4 capitalize text-center">{{ product.title }}</h1>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="mb-4 rounded max-h-64 object-contain"
      />

      <div class="w-full max-w-xl text-left">
        <p class="mb-4">
          <strong>Descrição</strong>:<br />
          {{ product.description }}
        </p>

        <p class="mb-4">
          <strong>Categoria</strong>:<br />
          {{ product.category }}
        </p>

        <p>
          <strong>Marca</strong>:<br />
          {{ product.brand }}
        </p>
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------------------------>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const product = ref({})
  const loading = ref(false)
  const error = ref(null)
  const mostrarAlertaCompra = ref(false)

  const formatPrice = (value) => {
    const parts = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).formatToParts(value)
    return parts
      .filter(p => p.type !== 'currency' && !(p.type === 'literal' && p.value.trim() === ''))
      .map(p => p.value)
      .join('')
  }

  const route = useRoute()
  const router = useRouter()

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const id = route.query.id
      if (!id) throw new Error('ID inválido')
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      if (!res.ok) throw new Error('Erro ao carregar produto')
      product.value = await res.json()
    } catch (err) {
      error.value = 'Produto não encontrado.'
    } finally {
      loading.value = false
    }
  }

  const goBack = () => {
    router.back()
  }

  const comprar = () => {
    mostrarAlertaCompra.value = true
  }

  onMounted(() => {
    fetchProducts()
  })
</script>
