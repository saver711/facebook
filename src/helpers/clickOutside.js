import {useEffect} from 'react';
export const useClickOutside = (ref, fun) =>{
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!ref.current || ref.current.contains(e.target)) return
            fun();
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
        };
    }, [ref]);
}