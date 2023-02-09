/* eslint-disable no-nested-ternary */
import React from 'react';
import Icon from '../Icon';

import css from './styles.module.scss';

type Props = {
  placeholder?: string;
  label?: string;
  helpText?: string | JSX.Element | boolean;
  icon?: string;
  error?: boolean;
  valid?: boolean;
  value?: string | number;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  step?: number;
  onClick?: (
    e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  [x: string]: any;
};

const TextInput: React.ForwardRefExoticComponent<Props> = React.forwardRef(
  (
    {
      placeholder,
      label,
      helpText,
      icon,
      error,
      valid,
      value,
      disabled,
      width,
      height,
      className,
      onChange,
      onClick,
      onKeyDown,
      onFocus,
      onBlur,
      type,
      rest,
      step,
    },
    ref,
  ) => {
    return (
      <div
        className={`${css['text-input']} ${disabled && css.disabled} ${
          icon ? (error || valid ? css['icon-right'] : css['icon-left']) : ''
        } ${!value && css.empty} ${error && css.error} ${
          valid && css.valid
        } ${className}`}
      >
        <label htmlFor="inputfield">{label}</label>
        <div className={`${css['input-wrapper']} `}>
          {icon && <Icon type={icon} className={`${css.icon} `} />}
          {type === 'textarea' ? (
            <textarea
              disabled={disabled}
              value={value}
              onKeyDown={onKeyDown}
              onChange={(e) => onChange(e)}
              onFocus={onFocus}
              onClick={onClick}
              onBlur={onBlur}
              placeholder={placeholder}
              name={label}
              style={{ width, height }}
            />
          ) : (
            <input
              type={type}
              disabled={disabled}
              value={value}
              ref={ref}
              step={step}
              onKeyDown={onKeyDown}
              onChange={(e) => onChange(e)}
              onFocus={onFocus}
              onClick={onClick}
              onBlur={onBlur}
              placeholder={placeholder}
              name={label}
              style={{ width, height }}
              {...rest}
            />
          )}
        </div>
        <p className={`${css['help-text']}`}>{!disabled && helpText}</p>
      </div>
    );
  },
);

TextInput.defaultProps = {
  helpText: '',
  label: 'LABEL',
  error: false,
  valid: false,
  disabled: false,
  placeholder: '',
  icon: undefined,
  width: '300px',
  height: '42px',
  className: '',
  type: 'text',
  onKeyDown: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onClick: () => null,
  step: 1,
};

export default TextInput;
