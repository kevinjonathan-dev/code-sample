import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function CirclePlusIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="8.5" stroke={color} />
      <mask id="path-2-inside-1_2179_37205" fill="white">
        <path d="M8.50001 5V13H9.50001V5H8.50001Z" />
      </mask>
      <path d="M8.50001 5V13H9.50001V5H8.50001Z" fill={color} />
      <path
        d="M8.50001 13H7.50001V14H8.50001V13ZM8.50001 5V4H7.50001V5H8.50001ZM9.50001 5H10.5V4H9.50001V5ZM9.50001 13V14H10.5V13H9.50001ZM9.50001 13V5H7.50001V13H9.50001ZM8.50001 6H9.50001V4H8.50001V6ZM8.50001 5V13H10.5V5H8.50001ZM9.50001 12H8.50001V14H9.50001V12Z"
        fill={color}
        mask="url(#path-2-inside-1_2179_37205)"
      />
      <mask id="path-4-inside-2_2179_37205" fill="white">
        <path d="M13 8.50001L5 8.50001L5 9.50001L13 9.50001L13 8.50001Z" />
      </mask>
      <path
        d="M13 8.50001L5 8.50001L5 9.50001L13 9.50001L13 8.50001Z"
        fill={color}
      />
      <path
        d="M5 8.50001L5 7.50001L4 7.5L4 8.5L5 8.50001ZM13 8.50001L14 8.50001L14 7.50001L13 7.50001L13 8.50001ZM13 9.50001L13 10.5L14 10.5L14 9.50001L13 9.50001ZM5 9.50001L4 9.5L4 10.5L5 10.5L5 9.50001ZM5 9.50001L13 9.50001L13 7.50001L5 7.50001L5 9.50001ZM12 8.50001L12 9.50001L14 9.50001L14 8.50001L12 8.50001ZM13 8.50001L5 8.50001L5 10.5L13 10.5L13 8.50001ZM6 9.50001L6 8.50001L4 8.5L4 9.5L6 9.50001Z"
        fill={color}
        mask="url(#path-4-inside-2_2179_37205)"
      />
    </svg>
  );
}
CirclePlusIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
