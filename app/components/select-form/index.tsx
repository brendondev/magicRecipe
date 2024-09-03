import Select from "react-select"

interface SelectFormProps {
  className?: string;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  onChange?: (options: any) => any;
  onClick?: (options: any) => any;
}

export const SelectForm = ({className, options, placeholder}: SelectFormProps) => {
  return (
    <>
    <Select
      className={className}
      isMulti
      closeMenuOnSelect={false}
      options={options}
      placeholder={placeholder}
    />
    </>
  )
}