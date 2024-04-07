'use client';
import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        // Use type assertion to ensure the parsed value matches the expected type
        return item ? JSON.parse(item) as T : initialValue;
      }
    } catch (error) {
      //console.error(error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      const valueToStore: T =
        typeof storedValue === "function" ? storedValue(storedValue) : storedValue;
      if (typeof window !== "undefined") {
        const serializedValue = JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
     // console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;

