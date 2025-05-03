import { useEffect, useState } from 'react';

interface Props {
    input?: string;
    time?: number;
}

export const useDebounceValue = ({ input = '', time = 500 }: Props) => {
    const [debounceValue, setDebounceValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [input]);


    return {
        debounceValue,
    };
};

