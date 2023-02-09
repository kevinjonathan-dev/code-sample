import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function SendIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_484_392)">
        <path
          d="M16.7188 8.29319C16.8146 8.00572 16.7398 7.68879 16.5255 7.47452C16.3112 7.26026 15.9943 7.18544 15.7068 7.28126L3.82743 11.2411C3.52645 11.3414 3.3132 11.6101 3.28384 11.926C3.25448 12.2419 3.41457 12.5453 3.6919 12.6993L7.32844 14.7196C7.64067 14.8931 8.03007 14.8386 8.28264 14.586L10.8686 12C11.181 11.6876 11.6876 11.6876 12 12C12.3124 12.3124 12.3124 12.819 12 13.1314L9.41401 15.7174C9.16144 15.9699 9.10691 16.3593 9.28037 16.6716L11.3007 20.3081C11.4548 20.5854 11.7581 20.7455 12.074 20.7162C12.3899 20.6868 12.6586 20.4736 12.759 20.1726L16.7188 8.29319Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_484_392">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(12 0.686279) rotate(45)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
SendIcon.defaultProps = {
  size: 24,
  color: '#14B8A6',
  className: '',
};
