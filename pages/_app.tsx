import "styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen relative flex min-h-screen bg-black font-mono ">
        <Sidebar />
        <div className="grow">
          <Component {...pageProps} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
