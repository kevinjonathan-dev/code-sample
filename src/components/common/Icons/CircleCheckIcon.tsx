import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function CircleCheckIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 6.10352e-05C4.986 6.10352e-05 0.5 4.48606 0.5 10.0001C0.5 15.5141 4.986 20.0001 10.5 20.0001C16.014 20.0001 20.5 15.5141 20.5 10.0001C20.5 4.48606 16.014 6.10352e-05 10.5 6.10352e-05ZM8.501 14.4131L4.788 10.7081L6.2 9.29206L8.499 11.5871L13.793 6.29306L15.207 7.70706L8.501 14.4131Z"
        fill={color}
      />
    </svg>
  );
}
CircleCheckIcon.defaultProps = {
  size: 20,
  color: '#000',
  className: '',
};
