
import React from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, value, onChange, options, placeholder, disabled = false }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none bg-white border border-slate-300 rounded-md py-3 pl-4 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'hover:border-slate-400'}`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
