import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <div className="page">
      <EmptyState title="Page not found." text="That route is not in the storefront." href="/" cta="Back to GozOptiks" />
    </div>
  );
}
