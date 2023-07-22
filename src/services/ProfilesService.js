import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
    logger.log(AppState.activeProfile)
  }

  async getProfilesBySearch(search) {
    const res = await api.get(`api/profiles?query=${search}`)
    AppState.profiles = res.data.map(p => new Profile(p))
  }
}

export const profilesService = new ProfilesService()