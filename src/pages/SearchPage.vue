<template>
  <div v-for="p in posts" :key="p.id" class="my-3 elevation-4">
    <PostCard :postProp="p" />
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'

export default {
  setup() {
    onMounted(() => { });
    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard }
}
</script>

<style lang="scss" scoped></style>