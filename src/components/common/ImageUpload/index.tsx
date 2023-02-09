import React, { useEffect, useRef } from 'react';
import useStore from 'hooks/useStore';
import css from './styles.module.scss';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image?: File;
};

export default function ImageUpload({ onChange, image }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { store } = useStore();
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    // when image change, set the image as url
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImgSrc(undefined);
    }
  }, [image]);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => null}
      onClick={() => {
        inputRef.current?.click();
      }}
      className={`${css['image-upload']} overflow-hidden bg-cover bg-center cursor-pointer duration-300 w-12 h-12 flex items-center justify-center rounded-full bg-teal-500 text-base font-semibold text-white relative`}
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    >
      {!image && store.company?.name?.slice(0, 1).toUpperCase()}
      <div
        className={`${css.overlay} w-full h-full absolute inset-0 duration-300`}
      >
        <input
          accept="image/*"
          onChange={onChange}
          ref={inputRef}
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
}

ImageUpload.defaultProps = {
  image: undefined,
};
