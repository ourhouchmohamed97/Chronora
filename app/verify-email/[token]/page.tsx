"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ token: string }>;
}

export default function VerifyTokenPage({ params }: Props) {
  const { token } = use(params);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    fetch(`/api/verify_email/${token}`)
      .then(() => router.push("/login"))
      .catch(() => alert("Verification failed"));
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Verifying your email...</p>
    </div>
  );
}