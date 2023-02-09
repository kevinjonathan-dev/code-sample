import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function ChatIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 10H8.51M12.5 10H12.51M16.5 10H16.51M9.5 16H5.5C4.39543 16 3.5 15.1046 3.5 14V6C3.5 4.89543 4.39543 4 5.5 4H19.5C20.6046 4 21.5 4.89543 21.5 6V14C21.5 15.1046 20.6046 16 19.5 16H14.5L9.5 21V16Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
ChatIcon.defaultProps = {
  size: 24,
  color: 'white',
  className: '',
};
