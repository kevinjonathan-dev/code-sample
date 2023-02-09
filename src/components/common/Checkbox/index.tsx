import React, { useRef, useState } from 'react';
import Icon from '../Icon';
import css from './styles.module.scss';

type Props = {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
};

function Checkbox({
  onChange,
  checked,
  disabled,
  required,
  label,
  className,
}: Props): JSX.Element {
  const isChecked = checked;
  const setIsChecked = onChange;
  const [hover, setHover] = useState(false);
  const hiddenInputRef = useRef<any>(null);

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${css.checkbox} ${className}`}
      onClick={() => {
        hiddenInputRef?.current?.click();
        if (!disabled && setIsChecked) {
          setIsChecked(!isChecked);
        }
      }}
    >
      <input
        onChange={(e) => {
          e.stopPropagation();
          if (setIsChecked) setIsChecked(e.currentTarget.checked);
        }}
        ref={hiddenInputRef}
        disabled={disabled}
        checked={isChecked}
        type="checkbox"
      />
      <div
        tabIndex={0}
        role="button"
        onKeyPress={() => null}
        onClick={(e) => {
          e.stopPropagation();
          hiddenInputRef?.current?.click();
          if (!disabled && setIsChecked) {
            setIsChecked(!isChecked);
          }
        }}
        className={`${css.box} ${isChecked && css.checked} ${
          required && !isChecked && css.required
        } ${disabled && css.disabled}`}
      >
        {isChecked && (
          <Icon
            type={disabled ? 'check' : hover ? 'minus' : 'check'}
            size={disabled ? 12 : hover ? 10 : 12}
            color={disabled ? '#B6B6B6' : '#14B8A6'}
          />
        )}
      </div>
      {label}
    </button>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  required: false,
  label: undefined,
  onChange: () => null,
  className: '',
};

export default Checkbox;
