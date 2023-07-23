import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
  }

  async getProfilesBySearch(search) {
    const res = await api.get(`api/profiles?query=${search}`)
    AppState.profiles = res.data.map(p => new Profile(p))
  }

  async updateProfile(data) {
    const res = await api.put('account', data)
    AppState.account = new Account(res.data)
  }
}

export const profilesService = new ProfilesService()