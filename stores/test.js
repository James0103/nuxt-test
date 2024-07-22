export const useTestStore = defineStore('testStore', {
  state: () => ({
    queryKeyword: ''
  }),
  actions: {
    setQueryKeyword(keyword) {
      this.queryKeyword = keyword
    },
    async getDataWithQueryKeyword() {
      const BASE_URL = `https://search.shopping.naver.com/search/all?query=${this.queryKeyword}&bt=-1&frm=NVSCPRO`
      const resp = await useFetch(BASE_URL)
      console.log(resp)
    }
    // async fetch() {
    //   const infos = await $fetch('https://api.nuxt.com/modules/pinia')

    //   this.name = infos.name
    //   this.description = infos.description
    // },
    // addStep() {
    //   console.log("click add step")
    //   this.step++
    // },
    // addStepDouble() {
    //   console.log("Add Step Double")
    //   this.step = this.step * 2
    // }
  }
})
