const { AppState } = require("../AppState");
const { server } = require("./AxiosService");

class AdsService {
    async getAds(){
        const res = await server.get('api/ads')
        AppState.ads = res.data
    }
}

export const adsService = new AdsService()