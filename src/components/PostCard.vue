<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex align-items-center">
      <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
        <img class="profile-pic m-3" :src="postProp.creator.picture" :alt="postProp.creator.name">
      </router-link>
      <div>
        <p class="fw-weight pb-2">{{ postProp.creator.name }}</p>
        <div class="d-flex text-secondary">
          <p>{{ postProp.createdAt }}</p>
          <i v-if="postProp.creator.graduated" class="mdi mdi-account-school px-3 gray"></i>
        </div>
      </div>
    </div>

    <div v-if="account.id == postProp.creatorId" class="dropdown p-3">
      <div type="button" class="selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="mdi mdi-dots-horizontal fs-5"></i>
      </div>
      <div class="dropdown-menu dropdown-menu-end p-0" aria-labelledby="authDropdown">
        <div class="list-group">
          <div class="list-group-item dropdown-item list-group-item-action">
            <i class="mdi mdi-pencil"></i>
            Edit
          </div>
          <div class="list-group-item dropdown-item list-group-item-action text-danger selectable">
            <i class="mdi mdi-trash-can"></i>
            Delete
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="mx-3 mb-2">{{ postProp.body }}</p>
  <img v-if="postProp.imgUrl" class="large-img mb-2" :src="postProp.imgUrl" :alt="postProp.creator.name">

  <div class="d-flex justify-content-end p-3 fs-4">
    <i v-if="liked" class="mdi mdi-heart heart"></i>
    <i v-else class="mdi mdi-heart-outline heart"></i>
    <p class="ps-2">{{ postProp.likes.length }}</p>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue'

export default {
  props: {
    postProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(() => { })

    return {
      account: computed(() => AppState.account),
      liked: computed(() => props.postProp.likes.find(p => p.id == AppState.account.id))
    }
  }
}
</script>

<style lang="scss" scoped>
.heart {
  color: #7EDACF;
}
</style>