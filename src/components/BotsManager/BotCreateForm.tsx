import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBotMutations } from "@/hooks/useBotMutations";
import { ICreateBot } from "@/services/bot/bot.types";
import { Field } from "../ui/field/Field";
import { useToast } from "@/hooks/useToast";
import { Loader } from "../ui/loader/Loader";

export const BotCreateForm = () => {
  const { createBot, isCreatePending } = useBotMutations();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateBot>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ICreateBot> = async (data: ICreateBot) => {
    try {
      await createBot(data);
      reset();
      toast({
        title: "Бот успешно создан",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to create bot:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="ml-5 bg-white rounded-md text-black px-3 text-sm">
        Добавить нового бота
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">Добавить нового бота</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <Field
                  type="text"
                  {...register("steam_id", { required: true })}
                  placeholder="Steam ID"
                />
                {errors.steam_id && <span>This field is required</span>}

                <Field
                  type="text"
                  {...register("account_name", { required: true })}
                  placeholder="Login"
                />
                {errors.account_name && <span>This field is required</span>}

                <Field
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                />
                {errors.password && <span>This field is required</span>}

                <Field
                  type="text"
                  {...register("shared_secret", { required: true })}
                  placeholder="Shared Secret"
                />
                {errors.shared_secret && <span>This field is required</span>}

                <Field
                  type="number"
                  {...register("port", { required: true })}
                  placeholder="Port"
                />
                {errors.port && <span>This field is required</span>}

                <Button
                  type="submit"
                  variant="default"
                  disabled={isCreatePending}
                >
                  {isCreatePending ? <Loader size="sm" /> : "Добавить бота"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
