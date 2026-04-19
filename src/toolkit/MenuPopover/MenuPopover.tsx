import React, { useEffect, useRef, useState, type RefObject } from 'react';
import styles from './MenuPopover.module.css';
import { createPortal } from 'react-dom';

type MenuPopoverProps = {
  control: (renderProps: { anchorRef: RefObject<HTMLElement | null>; triggerOpen: (e: React.SyntheticEvent) => void }) => React.ReactNode;
  children: React.ReactNode;
};

export const MenuPopover: React.FC<MenuPopoverProps> = ({ control, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const triggerOpen = (e: React.SyntheticEvent) => {
    if (isOpen) return;

    anchorRef.current = e.currentTarget as HTMLElement;
    const rect = e.currentTarget.getBoundingClientRect();

    setIsOpen(true);
    setStyle({
      position: 'absolute',
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + rect.width + window.scrollX,
      transform: 'translateX(-100%)',
    });
  };

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node) && !anchorRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, anchorRef]);

  return (
    <>
      {control({ anchorRef, triggerOpen })}
      {createPortal(
        <div className={`${!isOpen ? 'hide' : ''} ${styles.popover}`} style={style} ref={popoverRef}>
          {children}
        </div>,
        document.body,
      )}
    </>
  );
};
