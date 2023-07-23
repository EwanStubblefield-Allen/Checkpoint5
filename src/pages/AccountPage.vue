<template>
  <div class="my-3 elevation-4 p-0 position-relative">
    <div class="position-relative">
      <img class="large-img position-relative" :src="account.coverImg" alt="">
      <div class="pic-position d-flex align-items-end">
        <img class="account-pic" :src="account.picture" :alt="account.name">
        <p class="fs-3 fw-bold">{{ account.name }}</p>
      </div>
    </div>
    <div class="my-4 py-3 m-md-0 p-md-0"></div>
    <form @submit.prevent="updateProfile()">
      <div class="form-group py-1 px-3 w-50 form-position">
        <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" placeholder="Image Url...">
        <label for="coverImg">Cover Image Url</label>
      </div>
      <div class="d-md-flex align-items-end">
        <div class="w-60">
          <div class="form-group py-1 px-3">
            <label for="profileImg">Profile Image Url</label>
            <input v-model="editable.picture" type="url" class="form-control" id="profileImg" placeholder="Image Url...">
          </div>
          <div class="d-flex">
            <div class="form-group py-1 px-3 flex-grow-1">
              <label for="class">Attending Class</label>
              <input v-model="editable.class" type="text" class="form-control" id="class" placeholder="class...">
            </div>
            <div class="d-flex flex-column align-items-center align-items-md-end form-check px-3">
              <label class="form-check-label" for="graduated">Graduated</label>
              <input v-model="editable.graduated" type="checkbox" class="form-check-input" id="graduated" :checked="account.graduated">
            </div>
          </div>
        </div>
        <div class="w-40">
          <div class="form-group py-1 px-3">
            <label for="github">Github</label>
            <input v-model="editable.github" type="url" class="form-control" id="github" aria-describedby="github" placeholder="url...">
          </div>
          <div class="form-group py-1 px-3">
            <label for="linkedIn">LinkedIn</label>
            <input v-model="editable.linkedin" type="url" class="form-control" id="linkedIn" aria-describedby="linkedIn" placeholder="url...">
          </div>
          <div class="form-group py-1 px-3">
            <label for="resume">Resume</label>
            <input v-model="editable.resume" type="url" class="form-control" id="resume" aria-describedby="resume" placeholder="url...">
          </div>
        </div>
      </div>
      <div class="form-group py-1 px-3">
        <label for="bio">Bio</label>
        <textarea v-model="editable.bio" class="form-control" name="bio" id="bio" rows="4" placeholder="Tell us about yourself"></textarea>
      </div>
      <div class="d-flex justify-content-around justify-content-md-end py-4 px-3">
        <button type="reset" class="btn text-secondary mx-md-5 px-5">Cancel</button>
        <button type="submit" class="btn submit-btn text-secondary">Submit Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...AppState.account }
    })

    return {
      account: computed(() => AppState.account),
      editable,

      async updateProfile() {
        try {
          await profilesService.updateProfile(editable.value)
        } catch (error) {
          Pop.error(error.message, '[UPDATING PROFILE]')
        }
      }
    }
  }
}
</script>

<style scoped>
.account-pic {
  height: 130px;
  width: 130px;
  border: 3px solid #7EDACF;
  border-radius: 50%;
}

.pic-position {
  position: absolute;
  bottom: -65px;
}

.form-position {
  position: absolute;
  top: 20px;
}

.submit-btn {
  border-radius: 4px;
  background: #8ADDD4;
}

@media (min-width: 768px) {
  .form-position {
    width: 40%;
    right: 0;
  }

  .w-60 {
    width: 60%;
  }

  .w-40 {
    width: 40%;
  }
}
</style>
