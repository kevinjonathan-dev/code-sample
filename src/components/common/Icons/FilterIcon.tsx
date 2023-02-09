import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function FilterIcon({
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
        d="M1.3335 2.66671C1.3335 1.93033 1.93045 1.33337 2.66683 1.33337H13.3335C14.0699 1.33337 14.6668 1.93033 14.6668 2.66671V4.39056C14.6668 4.74419 14.5264 5.08333 14.2763 5.33337L10.0002 9.60952L10.0002 11.3334C10.0002 11.5102 9.92992 11.6798 9.8049 11.8048L7.13823 14.4714C6.94757 14.6621 6.66082 14.7191 6.41171 14.616C6.16259 14.5128 6.00016 14.2697 6.00016 14V9.60952L1.72402 5.33337C1.47397 5.08332 1.3335 4.74419 1.3335 4.39056V2.66671ZM13.3335 2.66671H2.66683V4.39056L6.94297 8.66671C7.19302 8.91676 7.3335 9.2559 7.3335 9.60952V12.3906L8.66683 11.0572V9.60952C8.66683 9.2559 8.8073 8.91676 9.05735 8.66671L13.3335 4.39056V2.66671Z"
        fill={color}
      />
    </svg>
  );
}
FilterIcon.defaultProps = {
  size: 16,
  color: '#14B8A6',
  className: '',
};
