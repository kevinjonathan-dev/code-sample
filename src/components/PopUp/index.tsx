import SubmitRow from "components/common/SubmitRow";
import React, { useEffect, useRef, useState } from "react";
import css from "./styles.module.scss";

type Props = {
  active?: boolean;
  onClose?: () => void;
  onSubmit?: (value: string) => void;
  buttonLabel?: string | JSX.Element;
  cancelLabel?: string;
  initialValue?: string;
  children?: React.ReactNode;
  className?: string;
  buttonDisabled?: boolean;
  minWidth?: number | string;
  minHeight?: number | string;
  showCancel?: boolean;
  align?: "left" | "center" | "right";
};

export default function PopUp({
  active,
  onClose,
  onSubmit,
  buttonLabel,
  cancelLabel,
  initialValue,
  children,
  className,
  buttonDisabled,
  minWidth,
  minHeight,
  showCancel,
  align,
}: Props): JSX.Element {
  const [value, setValue] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(value);
  };

  return (
    <div
      className={`${css["pop-up"]} fixed z-[51] top-0 left-0 duration-300 ${
        !active && "invisible opacity-0"
      } `}
    >
      <div
        className={`${css.overlay} w-screen h-screen flex items-center justify-center`}
      >
        <div
          ref={modalRef}
          className={`${css.modal} bg-white rounded shadow-md flex flex-col relative ${className}`}
          style={{ minWidth, minHeight }}
        >
          {children}
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

PopUp.defaultProps = {
  active: false,
  buttonLabel: "Submit",
  cancelLabel: "Cancel",
  initialValue: "",
  children: null,
  className: "",
  buttonDisabled: false,
  minWidth: 480,
  minHeight: 262,
  onClose: () => null,
  onSubmit: () => null,
  showCancel: true,
  submitRow: true,
  align: "center",
};
