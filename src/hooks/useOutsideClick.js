import { useEffect } from "react";

export const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            callback();
          }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);
}