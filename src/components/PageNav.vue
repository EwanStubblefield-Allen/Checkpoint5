<template>
  <section class="row justify-content-center my-3">
    <div class="col-10 d-flex justify-content-between no-select">
      <div @click="changePage(page, -1, pageProp)" :class="{ disabled: page == 1, 'text-secondary': page == 1 }" class="d-flex selectable py-1 px-3">
        <i class="mdi mdi-arrow-left pe-3"></i>
        <p>Newer</p>
      </div>
      <div @click="changePage(page, 1, pageProp)" :class="{ disabled: page == totalPages, 'text-secondary': page == totalPages }" class="d-flex selectable py-1 px-3">
        <p>Older</p>
        <i class="mdi mdi-arrow-right ps-3"></i>
      </div>
    </div>
  </section>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed } from 'vue'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'

export default {
  props: {
    pageProp: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),

      async changePage(page, change, prop) {
        try {
          if (prop == 'home') {
            await postsService.getPosts(page, change)
          } else if (prop == 'profile') {
            await postsService.getPostsByProfileId(page, change)
          }
          document.documentElement.scrollTop = 0
        } catch (error) {
          Pop.error(error.message, '[CHANGING PAGES]')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>