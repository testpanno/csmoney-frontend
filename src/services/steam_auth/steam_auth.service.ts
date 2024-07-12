import { instance } from '@/api/axios'
import { ISteamAuth } from "./steam_auth.types"

class SteamAuthService {
    async getLast100(){
        return instance.get<ISteamAuth[]>(`/auth/steam/auth_data?limit=100`)
    }
}

export default new SteamAuthService