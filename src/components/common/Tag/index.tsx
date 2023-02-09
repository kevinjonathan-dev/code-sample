import React from 'react';
import { capitalizeFirstLetter } from 'utils/format';
import CrossIcon from '../Icons/CrossIcon';
import css from './styles.module.scss';

type Props = {
  label?: string;
  active?: boolean;
  onClick?: (tag: string) => void;
  className?: string;
  removable?: boolean;
};

export default function Tag({
  label,
  active,
  onClick,
  className,
  removable,
}: Props): JSX.Element {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(label as string);
      }}
      className={`${css.tag} ${
        active ? css.active : css.inactive
      } cursor-pointer font-normal flex items-center justify-center ${className}`}
    >
      {capitalizeFirstLetter(label as string)}{' '}
      {active && removable && (
        <CrossIcon className="ml-1" color="white" size={18} />
      )}
    </button>
  );
}

Tag.defaultProps = {
  label: 'Tag',
  active: true,
  onClick: () => null,
  className: '',
  removable: false,
};
