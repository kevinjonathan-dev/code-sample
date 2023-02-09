import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function ErrorIcon({
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
      <mask id="path-2-inside-1" fill="white">
        <path d="M8.50001 5V10H9.50001V5H8.50001Z" />
        <path d="M9.50001 11.5H8.50001L8.5 13H9.50001V11.5Z" />
      </mask>
      <path d="M8.50001 5V10H9.50001V5H8.50001Z" fill={color} />
      <path d="M9.50001 11.5H8.50001L8.5 13H9.50001V11.5Z" fill={color} />
      <path
        d="M8.50001 10H7.50001V11H8.50001V10ZM8.50001 5V4H7.50001V5H8.50001ZM9.50001 5H10.5V4H9.50001V5ZM9.50001 10V11H10.5V10H9.50001ZM8.50001 11.5V10.5H7.50001L7.50001 11.5L8.50001 11.5ZM9.50001 11.5H10.5V10.5H9.50001V11.5ZM9.50001 13V14H10.5V13H9.50001ZM8.5 13L7.5 13L7.5 14H8.5V13ZM9.50001 10V5H7.50001V10H9.50001ZM8.50001 6H9.50001V4H8.50001V6ZM8.50001 5V10H10.5V5H8.50001ZM9.50001 9H8.50001V11H9.50001V9ZM8.50001 12.5H9.50001V10.5H8.50001V12.5ZM8.50001 11.5V13H10.5V11.5H8.50001ZM9.50001 12H8.5V14H9.50001V12ZM9.5 13L9.50001 11.5L7.50001 11.5L7.5 13L9.5 13Z"
        fill={color}
        mask="url(#path-2-inside-1)"
      />
    </svg>
  );
}
ErrorIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
