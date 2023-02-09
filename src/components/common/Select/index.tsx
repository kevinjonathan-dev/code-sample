/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown';
import ChevronIcon from '../Icons/ChevronIcon';
import TextInput from '../TextInput';
import css from './styles.module.scss';

type Props = {
  searchable?: boolean;
  items: Array<{
    label: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  }>;
  value?: string | number;
  setValue?: (value: string) => void;
  label?: string;
  width?: string | number;
  placeholder?: string;
  className?: string;
  height?: string | number;
  helpText?: string | JSX.Element;
  error?: boolean;
  disabled?: boolean;
};

export default function Select({
  searchable,
  items,
  value,
  setValue,
  label,
  width,
  placeholder,
  className,
  height,
  error,
  helpText,
  disabled,
}: Props): JSX.Element {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const clickRef2 = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent): void => {
    if (
      clickRef.current &&
      !clickRef.current.contains(e.target as Node) &&
      !clickRef2.current?.contains(e.target as Node)
    ) {
      setFocused(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${css.select} flex items-center relative ${className}`}
      style={{ width }}
    >
      <TextInput
        disabled={disabled}
        helpText={helpText}
        error={error}
        placeholder={placeholder}
        ref={inputRef}
        width={width}
        className={`${css.input} ${disabled && css.disabled} w-full`}
        value={value}
        onChange={(e) => {
          if (searchable) {
            if (setValue) {
              setValue(e.currentTarget.value);
            }
          }
        }}
        label={label}
      />
      <div
        ref={clickRef2}
        className={`${
          css['click-handler']
        } absolute z-0 bottom-0 w-full pointer-events-auto ${
          disabled && 'cursor-default'
        }`}
        onKeyPress={() => null}
        role="button"
        tabIndex={-1}
        onClick={() => {
          if (!disabled) {
            if (!focused) {
              inputRef.current?.focus();
              setFocused(true);
            } else {
              inputRef.current?.blur();
              setFocused(false);
            }
          }
        }}
      />
      {!disabled && (
        <div
          className={`${css['icon-wrapper']} absolute right-0 h-full w-4 flex items-center pointer-events-none`}
        >
          <ChevronIcon
            className={`${css.icon} ${focused && css.focus} ${
              focused && '-rotate-90 transform'
            } absolute transform rotate-90 duration-300 pointer-events-none`}
            size={10}
            color="black"
          />
        </div>
      )}
      <Dropdown
        ref={clickRef}
        title=""
        active={focused}
        className={`${css.dropdown} absolute left-0 z-30 transform translate-y-full`}
        width={width}
        height={height}
        items={items.map((item) => ({
          ...item,
          onClick: (e) => {
            e.stopPropagation();
            inputRef.current?.blur();
            setFocused(false);
            item.onClick(e);
          },
        }))}
      />
    </div>
  );
}

Select.defaultProps = {
  searchable: false,
  label: '',
  width: 300,
  value: undefined,
  placeholder: 'Select',
  className: '',
  height: 200,
  setValue: () => null,
  helpText: '',
  error: false,
  disabled: false,
};
