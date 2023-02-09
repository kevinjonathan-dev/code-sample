import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function SearchIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5.5" cy="5.5" r="5" stroke={color} />
      <path
        d="M14 14L9 9"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
SearchIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
