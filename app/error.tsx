"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          エラーが発生しました
        </h2>
        <p className="text-gray-600">
          {error.message || "製品の読み込みに失敗しました"}
        </p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  );
}

