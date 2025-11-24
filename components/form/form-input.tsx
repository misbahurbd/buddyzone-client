import { FormBase, FormControlFunc } from "./form-base";
import { FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends FormControlFunc<TFieldValues, TName> {
  type?: "text" | "password";
  placeholder?: string;
}

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  required,
  type,
  placeholder,
  disabled = false,
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormBase control={control} name={name} label={label} required={required}>
      {({ field, fieldState }) => (
        <input
          {...field}
          id={name}
          aria-invalid={fieldState.invalid}
          type={type ?? "text"}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-bg2 transition-all h-12 border border-bcolor3 py-1.5 px-3 rounded-md text-black focus:border-[#86b7fe] outline-none data-[invalid=true]:border-red-500 disabled:bg-bg3 disabled:text-color3"
        />
      )}
    </FormBase>
  );
};
