import Select from "react-select"

export const SelectForm = ({className, options, placeholder}) => {
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