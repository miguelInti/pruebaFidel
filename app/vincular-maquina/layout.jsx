import { Suspense } from "react";
import LoadingComponent from "@components/Loading/LoadingComponent";
export default function VincularMaquinaLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      <Suspense fallback={<LoadingComponent />}></Suspense>
      {children}
    </section>
  );
}
