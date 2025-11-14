'use client';

export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  options = [],
  rows = 4,
}) {
  const baseClasses =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
        >
          <option value="">Select {label?.toLowerCase() || 'option'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          className={`${baseClasses} ${errorClasses} ${disabledClasses} resize-none`}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}
