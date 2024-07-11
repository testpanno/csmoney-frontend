import { useMutation, useQueryClient } from "@tanstack/react-query";
import SteamBotService from "@/services/bot/bot.service";
import { ICreateBot } from "@/services/bot/bot.types";
import { useToast } from "@/hooks/useToast";


export const useBotMutations = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: createBot, isPending: isCreatePending } = useMutation({
    mutationKey: ["createBot"],
    mutationFn: (data: ICreateBot) => SteamBotService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all bots"],
      });
    },
  });

  const { mutate: stopBot, isPending: isStopPending } = useMutation({
    mutationKey: ["stopBot"],
    mutationFn: (data: { container_id: string }) => SteamBotService.stop(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all bots"],
      });
      toast({
        title: "Бот успешно остановлен",
        variant: "success",
      });
    },
  });

  const { mutate: restartBot, isPending: isRestartPending } = useMutation({
    mutationKey: ["restartBot"],
    mutationFn: (data: { container_id: string }) =>
      SteamBotService.restart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all bots"],
      });
      toast({
        title: "Бот успешно перезапущен",
        variant: "success",
      });
    },
  });

  const { mutate: deleteBot, isPending: isDeletePending } = useMutation({
    mutationKey: ["deleteBot"],
    mutationFn: (data: { container_id: string }) =>
      SteamBotService.delete(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get all bots"],
      });
      toast({
        title: "Бот удален успешно",
        variant: "success",
      });
    },
  });

  return {
    createBot,
    isCreatePending,
    stopBot,
    isStopPending,
    restartBot,
    isRestartPending,
    deleteBot,
    isDeletePending,
  };
};
