import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  settingData(data) {
    AppState.posts = data.posts.map(p => new Post(p))
    AppState.page = data.page
    AppState.totalPages = data.totalPages
  }

  async getPosts(page, change) {
    const res = await api.get(`api/posts?page=${page + change}`)
    window.location.hash = `?page=${res.data.page}`
    this.settingData(res.data)
  }

  async getPostsByProfileId(page, change, profileId = AppState.activeProfile.id) {
    const res = await api.get(`api/profiles/${profileId}/posts?page=${page + change}`)
    logger.log(window.location)
    // FIXME Change window location to useRouter()
    window.location.hash = `#/profile/${profileId}?page=${res.data.page}`
    this.settingData(res.data)
  }

  async getPostsBySearch(search) {
    const res = await api.get(`api/posts?query=${search}`)
    this.settingData(res.data)
  }

  resetVariables() {
    AppState.posts = []
    AppState.activeProfile = null
  }
}

export const postsService = new PostsService()