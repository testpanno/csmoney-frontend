"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field/Field";
import { Loader } from "@/components/ui/loader/Loader";
import authService from "@/services/auth/auth.service";
import { IAuthFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthFormProps {
  isLogin: boolean;
}

export function AuthForm({ isLogin }: AuthFormProps) {
  const { register, handleSubmit, reset } = useForm<IAuthFormData>();

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IAuthFormData) => authService.main("login", data),
    onSuccess() {
      reset();
      router.push("/");
      toast({
        title: "Вы успешно вошли",
        variant: "success",
      });
    },
  });

  const {
    error,
    mutate: mutateRegister,
    isPending: isRegisterPending,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IAuthFormData) => authService.main("register", data),
    onSuccess() {
      reset();
      router.push("/");
      toast({
        title: "Successful Sign Up",
        variant: "success",
      });
    },
  });

  const isPending = isLoginPending || isRegisterPending;

  const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
    isLogin ? mutateLogin(data) : mutateRegister(data);
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Войти" : "Register"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            extra="mb-4"
            label="Логин"
            type="text"
            placeholder="Введите логин: "
            autoComplete="off"
            {...register("email", { required: true })}
          />

          {error && <p className="text-red-500">{error.message}</p>}

          <Field
            extra="mb-4"
            label="Пароль"
            type="password"
            placeholder="Введите пароль: "
            {...register("password", { required: true })}
          />

          <div className="mb-4 ">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <Loader size="sm" />
              ) : isLogin ? (
                "Войти"
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
