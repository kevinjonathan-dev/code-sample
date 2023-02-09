import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function CheckIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 15 11"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.49992 11L0.5 5.99997L1.56058 4.93939L5.50004 8.87855L13.4394 0.939331L14.5 1.99997L5.49992 11Z"
        fill={color}
      />
    </svg>
  );
}
CheckIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
