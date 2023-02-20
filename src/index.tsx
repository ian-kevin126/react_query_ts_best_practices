import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "antd/dist/reset.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 添加配置切换页面将不再重新发请求
      refetchOnWindowFocus: false
    }
  }
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query-devtools";

// const queryCache = new QueryCache();

// export default function App() {
//   return (
//     <ReactQueryCacheProvider queryCache={queryCache}>
//       <Example />
//     </ReactQueryCacheProvider>
//   );
// }
