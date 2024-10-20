import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function usePolling(ms: number) {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => router.refresh(), ms);

    return () => clearInterval(timer);
  });
}
