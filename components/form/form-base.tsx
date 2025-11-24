import { ReactNode } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";

export type RenderProps = Parameters<
  ControllerProps<FieldValues, Path<FieldValues>, FieldValues>["render"]
>[0];

export interface FormControlFunc<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export interface FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> extends FormControlFunc<TFieldValues, TName> {
  children: (options: {
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"];
    fieldState: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["fieldState"];
  }) => ReactNode;
}

export const FormBase = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  label,
  required,
  children,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2 w-full">
          {label && (
            <label
              aria-invalid={fieldState.invalid}
              htmlFor={name}
              className="text-base font-medium text-color4"
            >
              {label} {required && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}
          {children({ field, fieldState })}
          {fieldState.invalid && (
            <p className="text-sm text-red-500">{fieldState.error?.message}</p>
          )}
        </div>
      )}
    />
  );
};
