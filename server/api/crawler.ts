import axios from 'axios'
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  const queries = getQuery(event);
  const BASE_URL = `https://search.shopping.naver.com/search/all?query=${queries.keyword}&bt=-1&frm=NVSCPRO`
  const resp = await axios.get(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    }
  )
  const $ = cheerio.load(resp.data);
  var products = []
  const bodyChildren = $('body').children()
  var _NEXT_DATA = ''
  bodyChildren.each((i, elem) => {
    if ($(elem).attr('id') == "__NEXT_DATA__") {
      _NEXT_DATA = $(elem).text()
    }
  })

  try {
    const jsonData = JSON.parse(_NEXT_DATA)
    products = jsonData['props']['pageProps']['initialState']['products']['list']
  } catch (err) {
    console.error("Parsing error:", err);
  }

  var arrangedProducts: any[] = []

  for (let i = 0; i < products.length; i++) {
    const values = {
      "price": products[i]['item']['price'],
      "lowPrice": products[i]['item']['lowPrice'],
      "mallName": products[i]['item']['mallName'],
      "productName": products[i]['item']['productName'],
      "adCrUrl": products[i]['item']['adcrUrl'] ?? "",
      "prodUrl": products[i]['item']['mallProductUrl'] ?? "",
      "crUrl": products[i]['item']['crUrl'] ?? ""
    }
    arrangedProducts.push(values)
  }

  return arrangedProducts
})