import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback";
import "./styles.css";
import { Spin } from "antd";

const Home = lazy(async () => import("./pages/Home"));
const About = lazy(async () => import("./pages/About"));
const ProductList = lazy(async () => import("./pages/ProductList"));
const ModalDemo = lazy(async () => import("./pages/ModalDemo"));

export default function App() {
  return (
    <div className="App">
      <div>
        <NavLink to="/">首页</NavLink> |<NavLink to="/about">关于</NavLink> |
        <NavLink to="/modal">Modal</NavLink> |<NavLink to="/list">列表</NavLink>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spin />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/modal" element={<ModalDemo />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}
