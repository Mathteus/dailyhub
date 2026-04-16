import { useState } from 'react'
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { Sidebar } from "@/components/home/sidebar";
import { Content } from "@/components/home/content";

export default function App() {
  return (
    <main className="flex h-screen p-4">
      <Sidebar />
      <Content />
    </main>
  );
}

