import { useEffect, useRef } from "react";

export function useFocusOnLoad() {
    const inputRef = useRef<any>(null)

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return inputRef;
}
