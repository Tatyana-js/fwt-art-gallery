import { useRef } from 'react';

interface UseScrollLockReturn {
  lock: () => void;
  unlock: () => void;
}

const useScrollLock = (): UseScrollLockReturn => {
  const isLockedRef = useRef(false);

  const lock = () => {
    if (isLockedRef.current) return;
    document.body.style.overflow = 'hidden';
    isLockedRef.current = true;
  };

  const unlock = () => {
    if (!isLockedRef.current) return;
    document.body.style.overflow = '';
    isLockedRef.current = false;
  };

  return { lock, unlock };
};

export default useScrollLock;
