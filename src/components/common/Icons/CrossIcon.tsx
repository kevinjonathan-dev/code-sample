import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function CrossIcon({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5355 5.4645C12.3403 5.26924 12.0237 5.26924 11.8284 5.4645L9 8.29292L6.17156 5.46448C5.9763 5.26923 5.65973 5.26923 5.46447 5.46448C5.26921 5.65974 5.26922 5.97631 5.46447 6.17157L8.2929 9.00002L5.46446 11.8284C5.26919 12.0237 5.26919 12.3403 5.46446 12.5356C5.65973 12.7308 5.97633 12.7308 6.1716 12.5356L9.00002 9.70714L11.8284 12.5356C12.0237 12.7308 12.3403 12.7308 12.5355 12.5356C12.7308 12.3403 12.7308 12.0237 12.5355 11.8285L9.70711 9.00004L12.5355 6.1716C12.7308 5.97634 12.7308 5.65976 12.5355 5.4645Z"
        fill={color}
      />
    </svg>
  );
}
CrossIcon.defaultProps = {
  size: 24,
  color: '#000',
  className: '',
};
