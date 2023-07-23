import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  resetVariables() {
    AppState.posts = []
    AppState.activeProfile = null
  }

  settingData(data) {
    AppState.posts = data.posts.map(p => new Post(p))
    AppState.page = data.page
    AppState.totalPages = data.totalPages
  }

  async getPosts(page, change) {
    const res = await api.get(`api/posts?page=${Number(page) + change}`)
    this.settingData(res.data)
  }

  async getPostsByProfileId(page, change, profileId = AppState.activeProfile.id) {
    const res = await api.get(`api/profiles/${profileId}/posts?page=${Number(page) + change}`)
    if (!res.data.posts[0]) {
      res.data.page = 1
      res.data.totalPages = 1
    }
    this.settingData(res.data)
  }

  async getPostsBySearch(search) {
    const res = await api.get(`api/posts?query=${search}`)
    this.settingData(res.data)
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(new Post(res.data))
  }

  async editPost(postData) {
    const res = await api.put(`api/posts/${postData.id}`, postData)
    const posts = AppState.posts
    const foundIndex = posts.findIndex(p => p.id == postData.id)
    posts.splice(foundIndex, 1, new Post(res.data))
  }

  async removePost(postId) {
    await api.delete(`api/posts/${postId}`)
    const posts = AppState.posts
    const foundIndex = posts.findIndex(p => p.id == postId)
    posts.splice(foundIndex, 1)
  }

  async toggleLikesByPostId(postId) {
    const res = await api.post(`/api/posts/${postId}/like`)
    const posts = AppState.posts
    const accountId = AppState.account.id
    const foundPost = posts.findIndex(p => p.id == postId)
    const foundIndex = posts[foundPost].likes.findIndex(l => l.id == accountId)
    if (foundIndex >= 0) {
      posts[foundPost].likes.splice(foundIndex, 1)
      posts[foundPost].isLiked = false
    } else {
      posts.splice(foundPost, 1, new Post(res.data))
      posts[foundPost].isLiked = true
    }
  }
}

export const postsService = new PostsService()