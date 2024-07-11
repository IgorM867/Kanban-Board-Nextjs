import { FormLabel } from "./FormLabel";

type TextAreaWithLabelProps = {
  label: string;
  name: string;
  placeholder: string;
};

function TextAreaWithLabel({ label, name, placeholder }: TextAreaWithLabelProps) {
  return (
    <div>
      <FormLabel label={label} htmlFor={name} />
      <textarea
        id={name}
        name={name}
        maxLength={200}
        rows={4}
        placeholder={placeholder}
        className="resize-none w-full bg-primary-color border-font-secondary-color border-2 outline-none rounded-md p-1 focus:border-font-primary-color"
      />
    </div>
  );
}

export { TextAreaWithLabel };
