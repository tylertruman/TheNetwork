import { AppState } from "../AppState.js"
import { server } from "./AxiosService.js"

class AdsService {
    async getAds(){
        const res = await server.get('api/ads')
        AppState.ads = res.data
    }
}

export const adsService = new AdsService()