import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  ads: [],
  page: 0,
  totalPages: 0,
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  /** @type {import('./models/Post.js').Post | null} */
  activePost: null,
  /** @type {import('./models/Profile.js').Profile[]} */
  profiles: [],
  /** @type {import('./models/Profile.js').Profile | null} */
  activeProfile: null
})
