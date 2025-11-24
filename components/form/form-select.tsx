import { cn } from "@/lib/utils";
import { FormBase, FormControlFunc } from "./form-base";
import { FieldPath, FieldValues } from "react-hook-form";

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends FormControlFunc<TFieldValues, TName> {
  options: { label: string; value: string }[];
  className?: string;
}

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  required,
  options,
  disabled = false,
  className,
}: FormSelectProps<TFieldValues, TName>) => {
  return (
    <FormBase control={control} name={name} label={label} required={required}>
      {({ field, fieldState }) => (
        <select
          {...field}
          id={name}
          aria-invalid={fieldState.invalid}
          disabled={disabled}
          className={cn(
            "w-full block bg-bg2 appearance-none transition-all h-12 border border-bcolor3 py-1.5 px-3 pr-8! rounded-md text-black focus:border-[#86b7fe] outline-none data-[invalid=true]:border-red-500 disabled:bg-bg3 disabled:text-color3",
            className
          )}
          style={{
            backgroundImage: "url('/images/Caretdown.svg')",
            backgroundPosition: "right 10px center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "10px",
          }}
        >
          {options.map((option: { label: string; value: string }) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FormBase>
  );
};
