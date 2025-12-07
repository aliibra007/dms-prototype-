import { useEffect } from 'react';

const useScrollLock = (isLocked) => {
    useEffect(() => {
        if (isLocked) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isLocked]);
};

export default useScrollLock;
