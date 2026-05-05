"use client";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  title?: string;
}

export default function ToggleSwitch({ checked, onChange, disabled, title }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={title}
      title={title}
      disabled={disabled}
      onClick={onChange}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
        disabled:cursor-not-allowed disabled:opacity-40
        ${checked ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}
      `}
    >
      <span
        className={`
          absolute top-1 h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-200
          ${checked ? "right-6" : "right-1"}
        `}
      />
    </button>
  );
}
