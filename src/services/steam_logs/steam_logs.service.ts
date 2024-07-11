import { instance } from '@/api/axios'
import { ISteamLog } from '@/types'

class SteamLogsService {
    async getLast100(){
        return instance.get<ISteamLog[]>(`/admin/logs/?limit=100`)
    }
}

export default new SteamLogsService()