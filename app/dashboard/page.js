'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to lessons page
    router.replace('/dashboard/lessons');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your lessons...</p>
      </div>
    </div>
  );
}