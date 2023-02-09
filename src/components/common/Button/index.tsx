import React from 'react';

type Props = {
  type?: string;
  disabled?: boolean;
  label?: string | JSX.Element;
  submit?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
};

function Button({
  id,
  type,
  disabled,
  label,
  className,
  submit,
  onClick,
}: Props): JSX.Element {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
      className={`px-4 py-2 font-medium flex items-center ${
        type === 'primary'
          ? 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700'
          : ' text-teal-500 hover:bg-slate-100 active:bg-slate-200'
      } ${className} border duration-100  border-teal-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  type: 'primary',
  label: "I'm a Button",
  disabled: false,
  className: 'h-fit',
  onClick: () => null,
  submit: false,
  id: undefined,
};

export default Button;
