<template>
  <section class="row justify-content-center my-3">
    <div class="col-10 d-flex justify-content-between no-select">
      <div @click="changePage(page, -1)" :class="{ disabled: page == 1, 'text-secondary': page == 1 }" class="d-flex selectable py-1 px-3">
        <i class="mdi mdi-arrow-left pe-3"></i>
        <p>Newer</p>
      </div>
      <div @click="changePage(page, 1)" :class="{ disabled: page == totalPages, 'text-secondary': page == totalPages }" class="d-flex selectable py-1 px-3">
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
import { useRouter } from 'vue-router'
import Pop from '../utils/Pop.js'

export default {
  props: {
    pageProp: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    async function changePage(page, change) {
      try {
        if (props.pageProp == 'home') {
          await postsService.getPosts(page, change)
        } else if (props.pageProp == 'profile') {
          await postsService.getPostsByProfileId(page, change)
        }
        router.replace({ query: { page: page + change } })
        document.documentElement.scrollTop = 0
      } catch (error) {
        Pop.error(error.message, '[CHANGING PAGES]')
      }
    }

    return {
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),

      changePage(page, change) {
        changePage(page, change)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>