<template>
  <div class="my-3 elevation-4 p-0">
    <div class="position-relative">
      <img class="large-img position-relative" :src="account.coverImg" alt="">
      <div class="pic-position d-flex align-items-end">
        <img class="account-pic" :src="account.picture" :alt="account.name">
        <p class="fs-3 fw-bold">{{ account.name }}</p>
      </div>
    </div>
    <form>
      <div class="d-md-flex align-items-end">
        <div class="w-60">
          <div class="form-group py-1 px-3">
            <label for="img">Profile Image Url</label>
            <input type="url" class="form-control" id="img" placeholder="Image Url...">
          </div>
          <div class="d-flex">
            <div class="form-group py-1 px-3 flex-grow-1">
              <label for="class">Attending Class</label>
              <input type="text" class="form-control" id="class" placeholder="class...">
            </div>
            <div class="d-flex flex-column align-items-end form-check px-3">
              <label class="form-check-label" for="graduated">Graduated</label>
              <input type="checkbox" class="form-check-input" id="graduated">
            </div>
          </div>
        </div>
        <div class="w-40">
          <div class="form-group py-1 px-3">
            <label for="github">Github</label>
            <input type="url" class="form-control" id="github" aria-describedby="github" placeholder="url...">
          </div>
          <div class="form-group py-1 px-3">
            <label for="linkedIn">LinkedIn</label>
            <input type="url" class="form-control" id="linkedIn" aria-describedby="linkedIn" placeholder="url...">
          </div>
          <div class="form-group py-1 px-3">
            <label for="resume">Resume</label>
            <input type="url" class="form-control" id="resume" aria-describedby="resume" placeholder="url...">
          </div>
        </div>
      </div>
      <div class="form-group py-1 px-3">
        <label for="bio">Bio</label>
        <textarea class="form-control" name="bio" id="bio" cols="30" rows="10" placeholder="Tell us about yourself"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
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

.w-60 {
  width: 60%;
}

.w-40 {
  width: 40%;
}
</style>
