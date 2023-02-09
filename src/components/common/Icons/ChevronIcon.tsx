import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function ChevronIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11L6 6L1 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
ChevronIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
