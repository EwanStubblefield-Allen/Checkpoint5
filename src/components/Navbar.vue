<template>
  <nav class="navbar navbar-expand-lg navbar-dark nav-bg px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img src="../assets/img/logo.png" alt="">
        <p>etwork</p>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto px-3">
        <li>
          <form @submit.prevent="search()">
            <div class="input-group">
              <input v-model="editable.search" type="text" class="form-control text-secondary" placeholder="Search" aria-label="search" aria-describedby="search" maxlength="100" required>
              <button type="submit" class="input-group-text" id="search" title="Search">+</button>
            </div>
          </form>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import Login from './Login.vue';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()

    async function getProfilesBySearch() {
      try {
        await profilesService.getProfilesBySearch(editable.value.search)
      } catch (error) {
        Pop.error(error.message, '[GETTING POSTS BY QUERY]')
      }
    }

    async function getPostsBySearch() {
      try {
        await postsService.getPostsBySearch(editable.value.search)
      } catch (error) {
        Pop.error(error.message, '[GETTING POSTS BY QUERY]')
      }
    }

    return {
      editable,

      search() {
        router.push({ name: 'Search' })
        getProfilesBySearch()
        getPostsBySearch()
        editable.value.search = ''
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
