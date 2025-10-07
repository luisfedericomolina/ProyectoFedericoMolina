import { useState } from "react";

export function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const incrementar = () => setCount(prev => prev + 1);
    const restarUno = () => setCount(prev => prev - 1);
    const resetear = () => setCount(initialValue);
    
    return {
        count,
        incrementar,
        restarUno,
        resetear
    };
}