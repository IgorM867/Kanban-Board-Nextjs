interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

function FormLabel({ label, ...props }: FormLabelProps) {
  return (
    <label htmlFor="status" className="text-xl font-medium block mb-3" {...props}>
      {label}
    </label>
  );
}

export { FormLabel };
