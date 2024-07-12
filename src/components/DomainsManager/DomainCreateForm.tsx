import { useEffect, useState } from "react";
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
import { useDomainMutations } from "@/hooks/useDomainMutations";
import { ICreateDomain } from "@/services/domain/domain.types";
import { Field } from "@/components/ui/field/Field";
import { useToast } from "@/hooks/useToast";
import { Loader } from "@/components/ui/loader/Loader";

export const DomainCreateForm = ({
  domain,
}: {
  domain?: ICreateDomain & { id?: number };
}) => {
  const { createDomain, isCreatePending, updateDomain, isUpdatePending } =
    useDomainMutations();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICreateDomain>({
    defaultValues: { domain_name: "" },
  });
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(!!domain);

  useEffect(() => {
    if (domain) {
      setIsEditMode(true);
      setValue("domain_name", domain.domain_name);
    } else {
      setIsEditMode(false);
      reset({ domain_name: "" });
    }
  }, [domain, setValue, reset]);

  const onSubmit: SubmitHandler<ICreateDomain> = async (
    data: ICreateDomain
  ) => {
    try {
      if (isEditMode && domain?.id) {
        await updateDomain({ domain_id: domain.id, data });
      } else {
        await createDomain(data);
      }
      reset();
      toast({
        title: isEditMode ? "Домен успешно обновлен" : "Домен успешно создан",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`bg-white rounded-md text-black px-3 text-sm ${
          !isEditMode ? "ml-5" : ""
        }`}
      >
        {isEditMode ? "Редактировать домен" : "Добавить новый домен"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">
            {isEditMode ? "Редактировать домен" : "Добавить новый домен"}
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <Field
                  type="text"
                  {...register("domain_name", { required: true })}
                  placeholder="Название домена"
                />
                {errors.domain_name && <span>Это поле обязательно</span>}

                <Button
                  type="submit"
                  variant="default"
                  disabled={isCreatePending || isUpdatePending}
                >
                  {isCreatePending || isUpdatePending ? (
                    <Loader size="sm" />
                  ) : isEditMode ? (
                    "Обновить домен"
                  ) : (
                    "Добавить домен"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
