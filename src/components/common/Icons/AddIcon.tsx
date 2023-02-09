import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function AddIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15 15"
    >
      <g
        id="Icon_feather-plus"
        data-name="Icon feather-plus"
        transform="translate(-7 -7)"
      >
        <path
          id="Path_338"
          data-name="Path 338"
          d="M18,7.5v14"
          transform="translate(-3.5)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_339"
          data-name="Path 339"
          d="M7.5,18h14"
          transform="translate(0 -3.5)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
AddIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
