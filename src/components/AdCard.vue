<template>
  <div class="container-fluid px-3">
    <section class="row">
      <div v-for="a in ads" :key="a.title" class="col-12 my-3">
        <img class="img-fluid" :src="a.tall" :alt="a.title">
      </div>
    </section>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'
import { adsService } from '../services/AdsService.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    onMounted(() => {
      getAds()
    })

    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error.message, '[GETTING ADS]')
      }
    }

    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style lang="scss" scoped></style>