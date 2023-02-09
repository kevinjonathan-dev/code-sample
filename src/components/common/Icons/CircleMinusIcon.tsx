import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function CircleMinusIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="8.5" stroke={color} />
      <mask id="path-2-inside-1_2179_37195" fill="white">
        <path d="M13 8.50001L5 8.50001L5 9.50001L13 9.50001L13 8.50001Z" />
      </mask>
      <path
        d="M13 8.50001L5 8.50001L5 9.50001L13 9.50001L13 8.50001Z"
        fill={color}
      />
      <path
        d="M5 8.50001L5 7.50001L4 7.5L4 8.5L5 8.50001ZM13 8.50001L14 8.50001L14 7.50001L13 7.50001L13 8.50001ZM13 9.50001L13 10.5L14 10.5L14 9.50001L13 9.50001ZM5 9.50001L4 9.5L4 10.5L5 10.5L5 9.50001ZM5 9.50001L13 9.50001L13 7.50001L5 7.50001L5 9.50001ZM12 8.50001L12 9.50001L14 9.50001L14 8.50001L12 8.50001ZM13 8.50001L5 8.50001L5 10.5L13 10.5L13 8.50001ZM6 9.50001L6 8.50001L4 8.5L4 9.5L6 9.50001Z"
        fill={color}
        mask="url(#path-2-inside-1_2179_37195)"
      />
    </svg>
  );
}
CircleMinusIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
