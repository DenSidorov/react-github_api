import { useEffect } from 'react';
import { useState } from 'react';

export function useDebounce (value: string, delay = 400): string {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
// Делаем задержку перед запросом delay = 400, чтобы не запрашивался каждый символ
    return debounced
}