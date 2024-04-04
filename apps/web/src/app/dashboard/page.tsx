'use client';
import { useState, useEffect } from 'react';
import ECommerce from "../../components/Dashboard/e-commerce";
import DefaultLayout from "@/components/Layouts/default-layout";
import Loader from "@/components/common/Loader";

export default function Page(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation (e.g., fetching data)
    const fakeAsyncOperation = setTimeout(() => {
      setIsLoading(false); // Set loading state to false after some time
    }, 2000); // Simulated loading time: 2 seconds

    // Clean up the timeout to avoid memory leaks
    return () => {
      clearTimeout(fakeAsyncOperation);
    };
  }, []); // Run only once when the component mounts

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <ECommerce />
      )}
    </DefaultLayout>
  );
}
