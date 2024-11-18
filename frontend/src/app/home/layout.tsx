"use client";

import { Aside } from "@/components/Aside";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div>
    <div className="flex flex-col bg-gray-100">
      <Aside />
      {children}
    </div>
  </div>
  );
}
