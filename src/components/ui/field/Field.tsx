import React, { forwardRef, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
 

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  extra?: string;
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, extra, ...rest }, ref) => {
    return (
      <div className={`${extra}`}>
        <Label>{label}</Label>
        <Input ref={ref} {...rest} />
      </div>
    );
  }
);

Field.displayName = "field";
