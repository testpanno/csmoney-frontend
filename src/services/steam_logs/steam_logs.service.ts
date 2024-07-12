import { instance } from '@/api/axios'
import { ISteamLog } from '@/types'

class SteamLogsService {
    async getLast(){
        return instance.get<ISteamLog[]>(`/admin/logs/?limit=200`)
    }
}

export default new SteamLogsService()