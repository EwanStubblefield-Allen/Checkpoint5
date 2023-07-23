<template>
  <div class="container-fluid">
    <section class="row">
      <div class="d-none d-md-block col-2 ps-0">
        <MyProfileCard />
      </div>
      <div class="col-12 col-md-10">
        <header class="row">
          <Navbar />
        </header>
        <main class="row">
          <div class="col-12 col-md-9">
            <router-view />
          </div>
          <AdCard class="d-none d-md-block col-3 my-3" />
        </main>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import MyProfileCard from './components/MyProfileCard.vue'
import AdCard from './components/AdCard.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, AdCard, MyProfileCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  font-family: Inter;
}

p {
  margin: 0;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.nav-bg {
  background: linear-gradient(90deg, #39C4C6 0%, rgba(255, 255, 255, 0.00) 100%), #7EDACF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}

.blue {
  color: #39C4C6;
}

.gray {
  color: #424242;
}

.large-img {
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.profile-pic {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
</style>
