<script setup>
const route = useRoute()

const { data: products, status } = await useAsyncData('get-product-info', async () => {
  const respData = await $fetch('/api/crawler', {
    query: {
      'keyword': route.query.keyword
    }
  })

  return respData
})

async function onRefreshManual() {
  try {
    const respData = await $fetch('/api/crawler', {
      query: {
        'keyword': route.query.keyword
      }
    })
    products.value = respData
  } catch (error) {
    products.value = error
  }
}

</script>

<template>
  <div class="result-page">
    <div v-if="status !== 'success'">
      Loading ...
    </div>
    <div v-else>
      <button @click="onRefreshManual">Refresh</button>
      <span class="test-span" v-for="(item, index) in products" :key="index">
        <p>{{ item.price }}</p>
        <p class="divider"> | </p>
        <p>{{ item.lowPrice }}</p>
        <p class="divider"> | </p>
        <p>{{ item.productName }}</p>
        <p class="divider"> | </p>
        <p>{{ item.mallName }}</p>
      </span>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  width: 800px;
  height: 800px;
  overflow-y: auto;
}
.test-span {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.divider {
  margin: 0 10px;
}
</style>