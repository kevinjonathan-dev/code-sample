/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { forwardRef } from 'react';
import css from './styles.module.scss';

type Props = {
  title?: string;
  className?: string;
  itemClassName?: string;
  items: MenuItem[];
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  secondTitle?: string;
  extraItems?: MenuItem[];
  borders?: boolean;
};

export type MenuItem = {
  label: string | JSX.Element;
  onClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItem) => void;
};

const Dropdown = forwardRef<HTMLDivElement, Props>(
  (
    {
      title,
      className,
      itemClassName,
      width,
      height,
      minHeight,
      items,
      active,
      onClick,
      secondTitle,
      extraItems,
      borders,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        onKeyPress={() => null}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick(e);
          }
        }}
        style={{ width, height, minHeight }}
        className={`${css.dropdown} ${
          !active && 'invisible opacity-0'
        } absolute bg-white shadow-xl duration-300 flex flex-col z-20 ${className} `}
      >
        {title?.length ? (
          <p className="text-teal-500 font-medium text-left text-[10px] tracking-widest ml-2 my-2">
            {title?.toUpperCase()}
          </p>
        ) : null}
        <div className={`${css.inner} w-full h-full overflow-auto`}>
          {items.map((item, index, arr) => {
            return (
              <div
                onKeyPress={() => null}
                onClick={(e) => item.onClick(e, item)}
                key={typeof item.label === 'string' ? item.label : index}
                className={`${css['menu-item']} p-3 item-${index} ${
                  borders &&
                  index !== arr.length - 1 &&
                  'border-b border-slate-200'
                } flex text-left items-center w-full duration-300 cursor-pointer whitespace-nowrap ${itemClassName}`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
        {typeof extraItems === 'object' && secondTitle && (
          <p className={`${css.title} mt-6 text-left font-bold`}>
            {secondTitle}
          </p>
        )}
        {typeof extraItems === 'object' && (
          <div className={`${css.inner} w-full h-full min-h-fit overflow-auto`}>
            {extraItems.map((item, index) => {
              return (
                <div
                  onKeyPress={() => null}
                  onClick={(e) => item.onClick(e, item)}
                  key={typeof item.label === 'string' ? item.label : index}
                  className={`${css['menu-item']} flex items-center w-full duration-300 cursor-pointer ${itemClassName}`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.defaultProps = {
  className: '',
  width: 'auto',
  height: '',
  minHeight: 100,
  active: false,
  onClick: () => null,
  title: '',
  itemClassName: '',
  secondTitle: undefined,
  extraItems: undefined,
  borders: false,
};

export default Dropdown;
