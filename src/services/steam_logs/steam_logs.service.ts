import { instance } from '@/api/axios'
import { ISteamLog } from './steam_logs.types'

class SteamLogsService {
    async getLast() {
        return instance.get<ISteamLog[]>(`/admin/logs/?limit=200`)
    }

    async getLastAccepted() {
        return instance.get<ISteamLog[]>(`/admin/logs/filter?status=accepted&limit=5&page=1`)
    }

    async getTotalPriceOfAcceptedLogs() {
        return instance.get<number>(`/admin/logs/total_price`)
    }

    async getLogsLast6Months() {
        return instance.get<{ month: string, total_price: number }[]>(`/admin/logs/stats/last_6_months`);
    }

    async getLogsLastMonth() {
        return instance.get<number>(`/admin/logs/stats/last_month`);
    }
}

export default new SteamLogsService()
