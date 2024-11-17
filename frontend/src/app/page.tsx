'use client';

import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  return (
    <section className="bg-[url('/images/investimento.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat dark:bg-gray-900">
      <LoginForm />
    </section>
  );
}