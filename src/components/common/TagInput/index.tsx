/* eslint-disable jsx-a11y/click-events-have-key-events */
import useToast from 'hooks/useToast';
import React, { useEffect, useRef, useState } from 'react';
import { validateEmail } from 'utils/format';
import CrossIcon from '../Icons/CrossIcon';
import css from './styles.module.scss';

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
};

const TagInput = ({ tags, onChange, className }: Props): JSX.Element => {
  const [activeTags, setActiveTags] = useState<string[]>(tags);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInput(value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key === ',' || key === 'Enter') &&
      trimmedInput.length &&
      !activeTags.includes(trimmedInput)
    ) {
      if (validateEmail(trimmedInput)) {
        e.preventDefault();
        setActiveTags((prevState) => [...prevState, trimmedInput]);
        setInput('');
      } else {
        toast.error('Please enter a valid email address', 'Invalid Email');
      }
    }

    if (key === 'Backspace' && !input.length && activeTags.length) {
      e.preventDefault();
      const activeTagsCopy = [...activeTags];
      const poppedTag = activeTagsCopy.pop();

      setActiveTags(activeTagsCopy);
      if (poppedTag) setInput(poppedTag);
    }
  };

  const onRemove = (tag: string) => {
    setActiveTags((prevState) => prevState.filter((t) => t !== tag));
  };

  useEffect(() => {
    onChange(activeTags);
  }, [activeTags]);

  useEffect(() => {
    setActiveTags(tags);
  }, [tags]);

  return (
    <div className={`${css['tag-input']} ${className}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (inputRef.current) inputRef.current.focus();
        }}
        className={`${css['input-wrapper']} border border-slate-200 bg-white container flex items-center rounded-md`}
      >
        {activeTags.map((tag) => (
          <button
            type="button"
            className={`${css.tag} bg-teal-50 rounded-full px-3 py-1 flex items-center`}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(tag);
            }}
          >
            {tag} <CrossIcon color="#4c4c4c" size={18} />
          </button>
        ))}
        <input
          ref={inputRef}
          className={`${css.input} flex-1 px-3`}
          value={input}
          placeholder="Type emails separated by comma"
          onKeyDown={onKeyDown}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

TagInput.defaultProps = {
  className: '',
};

export default TagInput;
