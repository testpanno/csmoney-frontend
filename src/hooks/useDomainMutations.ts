import { useMutation, useQueryClient } from "@tanstack/react-query";
import DomainService from "@/services/domain/domain.service";
import { ICreateDomain } from "@/services/domain/domain.types";
import { useToast } from "@/hooks/useToast";

export const useDomainMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: createDomain, isPending: isCreatePending } = useMutation({
    mutationKey: ["createDomain"],
    mutationFn: (data: ICreateDomain) => DomainService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all domains"],
      });
      toast({
        title: "Домен успешно создан",
        variant: "success",
      });
    },
  });

  const { mutate: deleteDomain, isPending: isDeletePending } = useMutation({
    mutationKey: ["deleteDomain"],
    mutationFn: (domain_id: number) => DomainService.delete(domain_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all domains"],
      });
      toast({
        title: "Домен успешно удален",
        variant: "success",
      });
    },
  });

  const { mutate: updateDomain, isPending: isUpdatePending } = useMutation({
    mutationKey: ["updateDomain"],
    mutationFn: ({ domain_id, data }: { domain_id: number; data: ICreateDomain }) =>
      DomainService.update(domain_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all domains"],
      });
      toast({
        title: "Домен успешно обновлен",
        variant: "success",
      });
    },
  });

  return {
    createDomain,
    isCreatePending,
    deleteDomain,
    isDeletePending,
    updateDomain,
    isUpdatePending,
  };
};
