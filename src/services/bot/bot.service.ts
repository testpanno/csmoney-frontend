import { axiosBot } from "@/api/axios";
import { IBotResponse, ICreateBot, ICreateBotResponse } from "./bot.types";

class SteamBotService {
  async create(data: ICreateBot) {
    const response = axiosBot.post<ICreateBotResponse>(`/create-bot`, data);

    return response;
  }

  async stop(data: { container_id: string }) {
    const response = axiosBot.post<{ status: string }>(`/stop-bot`, data);

    return response;
  }

  async delete(data: { container_id: string }) {
    const response = axiosBot.post<{ status: string }>(`/delete-bot`, data);

    return response;
  }

  async restart(data: { container_id: string }) {
    const response = axiosBot.post<{ status: string }>(`/restart-bot`, data);

    return response;
  }

  async getAll() {
    return axiosBot.get<IBotResponse[]>(`/list-bots`);
  }

  async getLogs(container_id: string) {
    return axiosBot.get<IBotResponse[]>(`/get-logs?container_id=${container_id}`);
  }
}

export default new SteamBotService();
