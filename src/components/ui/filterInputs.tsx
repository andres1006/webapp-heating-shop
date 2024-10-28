import { FC, InputHTMLAttributes } from 'react';

interface FilterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const FilterInput: FC<FilterInputProps> = ({ placeholder, ...props }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    {...props}
  />
);

export default FilterInput;