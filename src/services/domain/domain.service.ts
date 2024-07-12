import { instance } from "@/api/axios";
import { ICreateDomain, IDomainResponse } from "./domain.types";

class DomainService {
  async create(data: ICreateDomain) {
    const response = instance.post<ICreateDomain>(`/admin/domains/`, data);

    return response;
  }

  async delete(domain_id: number) {
    const response = instance.delete<{ status: string }>(`/admin/domains/${domain_id}`);

    return response;
  }

  async update(domain_id: number, data: ICreateDomain) {
    const response = instance.put<ICreateDomain>(`/admin/domains/${domain_id}`, data);

    return response;
  }


  async getAll() {
    return instance.get<IDomainResponse[]>(`/admin/domains/?limit=20`);
  }
}

export default new DomainService();
