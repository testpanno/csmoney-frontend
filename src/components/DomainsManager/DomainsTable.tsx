import DomainService from "@/services/domain/domain.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader/Loader";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IDomainResponse } from "@/services/domain/domain.types";
import { DomainCreateForm } from "./DomainCreateForm";
import { Heading } from "../ui/heading";


export default function DomainsTable() {
  const {
    data: domains,
    isLoading: isDomainsLoading,
    isFetching: isDomainsFetching,
    error: domainsError,
    refetch: refetchDomainsData,
  } = useQuery({
    queryKey: ["get all domains"],
    queryFn: () => DomainService.getAll(),
  });

  if (domainsError) return <div>Error: {domainsError.message}</div>;

  const domainData: IDomainResponse[] = domains?.data ?? [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <Heading title="Домены"></Heading>
        <div className="flex">
          <Button variant="outline" onClick={() => refetchDomainsData()}>
            {isDomainsFetching ? <Loader size="sm" /> : "Обновить Домены"}
          </Button>
          <DomainCreateForm />
        </div>
      </div>
      {isDomainsLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <DataTable columns={columns} data={domainData} />
      )}
    </div>
  );
}
