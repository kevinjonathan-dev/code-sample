import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function TimeIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8ZM8 4.25C8.41421 4.25 8.75 4.58579 8.75 5V7.68934L10.7803 9.71967C11.0732 10.0126 11.0732 10.4874 10.7803 10.7803C10.4874 11.0732 10.0126 11.0732 9.71967 10.7803L7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V5C7.25 4.58579 7.58579 4.25 8 4.25Z"
        fill={color}
      />
    </svg>
  );
}
TimeIcon.defaultProps = {
  size: 16,
  color: '#94A3B8',
  className: '',
};
