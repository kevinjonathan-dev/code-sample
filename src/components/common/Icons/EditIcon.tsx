import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function EditIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 15C16 15.5523 15.5523 16 15 16H3C2.44772 16 2 15.5523 2 15V3C2 2.44772 2.44772 2 3 2H8.5C8.77614 2 9 1.77614 9 1.5C9 1.22386 8.77614 1 8.5 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17H15C16.1046 17 17 16.1046 17 15V9.5C17 9.22386 16.7761 9 16.5 9C16.2239 9 16 9.22386 16 9.5V15ZM6 9.14773L6.29289 8.85484L11.8586 3.28912L12.5657 2.58202L13.2728 1.87491L13.2729 1.87495L13.2848 1.86299L13.7387 1.40913C14.2757 0.872163 15.1463 0.87216 15.6832 1.40913L16.591 2.31685C17.1279 2.85382 17.1279 3.72442 16.591 4.26139L16.1371 4.71525L15.43 5.42235L15.4299 5.42231L15.418 5.43427L14.7109 6.14138L9.14515 11.7071L8.85226 12H8.43804H8H7H6V11V9.99999V9.56195V9.14773ZM14.7109 4.72717L14.0038 4.02006L13.9799 3.99623L13.2728 3.28912L12.5657 3.99623L7 9.56195L7 9.99999V11H8H8.43804L14.0038 5.43427L14.7109 4.72717ZM13.9919 2.5701L14.699 3.2772L14.7229 3.30103L15.43 4.00814L15.8838 3.55428C16.0028 3.43529 16.0251 3.25622 15.9508 3.1147C15.9336 3.08205 15.9113 3.0514 15.8838 3.02395L14.9761 2.11624C14.9487 2.08879 14.918 2.06648 14.8854 2.04932C14.7439 1.97494 14.5648 1.99724 14.4458 2.11624L13.9919 2.5701Z"
        fill={color}
      />
    </svg>
  );
}
EditIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
