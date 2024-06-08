import React from 'react';

interface EditProfileInputProps {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Add onKeyDown as optional
  placeholder?: string;
}

const EditProfileInput: React.FC<EditProfileInputProps> = ({
  label,
  type,
  value,
  name,
  onChange,
  onKeyDown,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-2 text-sm" htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="bg-gray-800 p-2 rounded text-white w-full"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          style={{ maxHeight: '200px' }}
          maxLength={1000}
        />
      ) : (
        <input
          className="bg-gray-800 p-2 rounded text-white w-full"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default EditProfileInput;
