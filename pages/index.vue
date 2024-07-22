<script setup>
// const router = useRouter()
const queryKeyword = ref('')
function sendQueryKeyword() {
  navigateTo({
    path: '/results',
    query: {
      keyword: queryKeyword.value
    }
  })
}
</script>

<template>
  <div class="index-page">
    <h3>키워드를 입력해주세요</h3>
    <input type="text" v-model="queryKeyword" @keyup.enter="sendQueryKeyword">
  </div>
</template>