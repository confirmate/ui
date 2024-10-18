import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Custom React hook to manage the state of a URL search parameter.
 *
 * @param {string} param - The name of the URL search parameter to manage.
 * @param {T} defaultValue - The default value for the search parameter if it is not present in the URL.
 * @return {[T, React.Dispatch<React.SetStateAction<T>>]} A stateful value, and a function to update it.
 *
 * @template T - The type of the search parameter value.
 *
 * @example
 * // Usage for a string search parameter
 * const [searchQuery, setSearchQuery] = useSearchParamState('query', '');
 */
export function useSearchParamState<T>(param: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [value, setValue] = useState(parseOrDefault(searchParams.get(param), defaultValue));

    // 
    useEffect(() => {
        const peek = parseOrDefault(searchParams.get(param), defaultValue);
        if (peek != value) {
            setValue(peek)
        }
    }, [searchParams])

    // This changes the URL parameters, when our value changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (value !== undefined && value !== null) {
            params.set(param, value.toString())
        } else {
            params.delete(param)
        }

        replace(`${pathname}?${params.toString()}`);
    }, [value]);

    return [value, setValue];
}

function parseOrDefault<T>(raw: string | null, defaultValue: T) {
    if (raw === null) {
        return defaultValue
    } else if (typeof defaultValue == "boolean") {
        return (raw == "true" ? true : false) as T
    } else if (typeof defaultValue == "number" && raw !== null) {
        return parseFloat(raw) as T
    } else {
        return raw as T
    }
}