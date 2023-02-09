/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import css from './styles.module.scss';

type Props = {
  selected?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  onClick: () => void;
  className?: string;
};

function RadioButton({
  selected,
  disabled,
  required,
  label,
  onClick,
  className,
}: Props): JSX.Element {
  return (
    <label
      tabIndex={0}
      onKeyPress={() => null}
      role="button"
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      className={`${css['radio-button']} ${className}`}
    >
      <input checked={selected} type="radio" />
      <div
        tabIndex={-1}
        role="button"
        onKeyPress={() => null}
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
        className={`${css.box} ${selected && css.selected} ${
          required && !selected && css.required
        } ${disabled && css.disabled}`}
      >
        {selected && (
          <div className={`${css.dot} ${selected && 'bg-teal-500'} `} />
        )}
      </div>
      {label}
    </label>
  );
}

RadioButton.defaultProps = {
  selected: false,
  disabled: false,
  required: false,
  label: 'label',
  className: '',
};

export default RadioButton;
