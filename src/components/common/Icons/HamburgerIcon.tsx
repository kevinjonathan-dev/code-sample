import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function HamburgerIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0H13C13.5523 0 14 0.447715 14 1C14 1.55228 13.5523 2 13 2H1C0.447715 2 0 1.55228 0 1Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 6C0 5.44772 0.447715 5 1 5H13C13.5523 5 14 5.44772 14 6C14 6.55228 13.5523 7 13 7H1C0.447715 7 0 6.55228 0 6Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 11C6 10.4477 6.44772 10 7 10H13C13.5523 10 14 10.4477 14 11C14 11.5523 13.5523 12 13 12H7C6.44772 12 6 11.5523 6 11Z"
        fill={color}
      />
    </svg>
  );
}
HamburgerIcon.defaultProps = {
  size: 24,
  color: '#64748B',
  className: '',
};
