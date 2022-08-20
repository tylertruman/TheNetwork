import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},
  /**@type {import('./models/Profile.js').Profile} */
  activeProfile: null,
  /**@type {import('./models/Post.js').Post[]} */
  posts: [],
  /**@type {import('./models/Post.js').Post[]} */
  searchPosts: [],
  /**@type {import('./models/Post.js').Post[]} */
  nextPage: [],
  /**@type {import('./models/Post.js').Post[]} */
  previousPage: [],
  /**@type {import('./models/Post.js').Post} */
  // activePost: null,
  // /**@type {import('./models/Post.js').Post[]} */
  profilePosts: [],
  /**@type {import('./models/Ad.js').Ad[]} */
  ads: [],

  
})
