import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { server } from "./AxiosService.js"

class ProfilesService {
    async getProfileById(profileId) {
        const res = await server.get(`api/profiles/${profileId}`)
        AppState.activeProfile = new Profile(res.data)
    }
}

export const profilesService = new ProfilesService()