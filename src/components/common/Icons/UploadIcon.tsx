import React from 'react';

type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export default function UploadIcon({
  className,
  size,
  color,
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.084 6.74984C20.6407 6.74984 15.4173 11.9732 15.4173 18.4165C15.4173 19.2999 15.515 20.157 15.6989 20.9788C16.0507 22.5503 15.0624 24.1095 13.4911 24.4619C9.58443 25.3382 6.66732 28.8318 6.66732 32.9998C6.66732 37.8323 10.5848 41.7498 15.4173 41.7498C17.0281 41.7498 18.334 43.0557 18.334 44.6665C18.334 46.2773 17.0281 47.5832 15.4173 47.5832C7.36317 47.5832 0.833984 41.054 0.833984 32.9998C0.833984 27.0019 4.45278 21.8544 9.62438 19.6133C9.59758 19.2176 9.58398 18.8185 9.58398 18.4165C9.58398 8.75152 17.419 0.916504 27.084 0.916504C34.746 0.916504 41.2532 5.83823 43.6252 12.6915C52.3686 13.6648 59.1673 21.08 59.1673 30.0832C59.1673 38.5529 53.1533 45.6115 45.1642 47.2332C43.5856 47.5536 42.0461 46.5336 41.7256 44.955C41.4052 43.3764 42.4251 41.8369 44.0038 41.5164C49.3278 40.4357 53.334 35.724 53.334 30.0832C53.334 23.6399 48.1106 18.4165 41.6673 18.4165C41.5892 18.4165 41.5112 18.4173 41.4333 18.4188C40.0247 18.4464 38.7977 17.4631 38.5177 16.0823C37.4379 10.7572 32.7256 6.74984 27.084 6.74984ZM27.9383 25.1041C29.0773 23.9651 30.924 23.9651 32.063 25.1041L40.813 33.8541C41.9521 34.9931 41.9521 36.8399 40.813 37.9789C39.674 39.1179 37.8273 39.1179 36.6883 37.9789L32.9173 34.208L32.9173 62.1665C32.9173 63.7773 31.6115 65.0832 30.0006 65.0832C28.3898 65.0832 27.084 63.7773 27.084 62.1665L27.084 34.208L23.313 37.9789C22.174 39.1179 20.3273 39.1179 19.1883 37.9789C18.0492 36.8399 18.0492 34.9931 19.1883 33.8541L27.9383 25.1041Z"
        fill={color}
      />
    </svg>
  );
}
UploadIcon.defaultProps = {
  size: 66,
  color: '#1E293B',
  className: '',
};