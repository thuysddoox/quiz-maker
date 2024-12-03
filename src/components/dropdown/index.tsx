import styled from 'styled-components';

export interface DropdownOption {
  label: string;
  value: string;
  id?: string | number;
}

export interface IDropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  defaultValue?: string;
  value?: string | number;
  id: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const Dropdown = ({
  id,
  options,
  placeholder,
  defaultValue,
  value,
  onChange,
  className,
}: IDropdownProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event);
  };

  return (
    <StyledSelect
      name={id}
      id={id}
      defaultValue={defaultValue ?? placeholder}
      value={value}
      onChange={handleOnChange}
      className={className}
    >
      {placeholder && (
        <option value={placeholder} disabled>
          {placeholder}
        </option>
      )}
      {options?.map((optionItem, index) => (
        <option
          value={optionItem?.value}
          key={optionItem?.id ?? `${optionItem?.label}${index}`}
        >
          {optionItem?.label}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  padding: 8px;
  border-radius: 0;
  min-height: 36px;
  min-width: 300px;
  border-color: #ccc;
`;
