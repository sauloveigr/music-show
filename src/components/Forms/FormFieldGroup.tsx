import React from 'react';

interface FormFieldGroupProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

const FormFieldGroup: React.FC<FormFieldGroupProps> = ({ label, error, children }) => {
  return (
    <fieldset className="space-y-2">
      {label && (
        <label className="text-white font-medium text-sm">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </fieldset>
  );
};

export default FormFieldGroup;
