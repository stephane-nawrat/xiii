function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error,
  placeholder,
  required = false,
  disabled = false 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-carbon mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3
          bg-cream border-2 rounded-lg
          text-carbon text-sm
          transition-all duration-200
          placeholder:text-gray-400
          focus:outline-none focus:border-carbon
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;