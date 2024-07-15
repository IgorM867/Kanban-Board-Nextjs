import { FormLabel } from "./FormLabel";

type TextInputWithLabelProps = {
  label: string;
  name: string;
  placeholder: string;
};

function TextInputWithLabel({ label, name, placeholder }: TextInputWithLabelProps) {
  return (
    <fieldset>
      <FormLabel label={label} htmlFor={name} />
      <input
        type="text"
        id={name}
        name={name}
        autoComplete="off"
        maxLength={50}
        required
        placeholder={placeholder}
        className="w-full bg-primary-color border-font-secondary-color border-2 outline-none rounded-md p-1 focus:border-font-primary-color"
      />
    </fieldset>
  );
}

export { TextInputWithLabel };
