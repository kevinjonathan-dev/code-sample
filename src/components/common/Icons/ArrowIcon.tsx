import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function ArrowIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 11.5L4.5 7L9 2.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7H17.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
ArrowIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
