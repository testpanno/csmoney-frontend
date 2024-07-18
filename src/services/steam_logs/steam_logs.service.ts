import { instance } from '@/api/axios'
import { ISteamLog } from './steam_logs.types'

class SteamLogsService {
    async getLast(){
        return instance.get<ISteamLog[]>(`/admin/logs/?limit=200`)
    }

    async getLast5Accepted(){
        return instance.get<ISteamLog[]>(`/admin/logs/filter?status=accepted&limit=7&page=1`)
    }
}

export default new SteamLogsService()