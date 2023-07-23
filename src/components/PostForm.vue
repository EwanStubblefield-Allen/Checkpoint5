<template>
  <div class="my-3 elevation-4">
    <div class="d-flex">
      <img class="profile-pic m-3" :src="account.picture" :alt="account.name">
      <form @submit.prevent="submitForm()" class="w-100 me-3">
        <textarea v-model="editable.body" class="form-control my-3 create-post" name="body" id="body" rows="4" placeholder="Share whats happening" required></textarea>
        <div class="collapse form-floating" id="postCollapse">
          <input v-model="editable.imgUrl" class="form-control" type="url" placeholder="...Url">
          <label for="">url...</label>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <button class="btn d-flex" type="button" data-bs-toggle="collapse" data-bs-target="#postCollapse">
            <i class="mdi mdi-image-multiple fs-3 blue"></i>
            <p class="gray p-2">Photo/Video</p>
          </button>
          <button class="btn d-flex align-items-center" type="submit">
            <i class="mdi mdi-send fs-5 blue"></i>
            <p class="gray p-2">Post</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, ref, watchEffect } from 'vue'
import { postsService } from '../services/PostsService.js'
import { Collapse } from 'bootstrap'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (AppState.activePost) {
        editable.value = { ...AppState.activePost }
      }
    })

    async function createPost() {
      try {
        await postsService.createPost(editable.value)
      } catch (error) {
        Pop.error(error.message, '[CREATING POST]')
      }
    }

    async function editPost() {
      try {
        await postsService.editPost(editable.value)
      } catch (error) {
        Pop.error(error.message, '[EDIT POST]')
      }
    }

    return {
      editable,
      account: computed(() => AppState.account),

      submitForm() {
        if (editable.value.id) {
          editPost()
          AppState.activePost = null
        } else {
          createPost()
        }
        editable.value = {}
        Collapse.getOrCreateInstance('#postCollapse').hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.create-post {
  border-radius: 3px;
  border: 2px dashed #39c4c670;
  background: #f6f9f9bd;
}
</style>