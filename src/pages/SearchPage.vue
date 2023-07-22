<template>
  <p v-if="profiles[0]" class="fs-2">People</p>
  <div v-for="p in profiles" :key="p.id" class="my-3 mx-2 elevation-4">
    <ProfileCard :profileProp="p" />
  </div>
  <p v-if="posts[0]" class="mt-3 fs-2">Posts</p>
  <div v-for="p in posts" :key="p.id" class="my-3 mx-2 elevation-4">
    <PostCard :postProp="p" />
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import ProfileCard from '../components/ProfileCard.vue';

export default {
  setup() {
    onMounted(() => { });
    return {
      posts: computed(() => AppState.posts),
      profiles: computed(() => AppState.profiles)
    };
  },
  components: { PostCard }
}
</script>

<style lang="scss" scoped></style>