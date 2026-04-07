import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16">
      <Card className="p-8">
        <div className="text-sm font-semibold text-[var(--text)]">Page not found</div>
        <div className="mt-2 text-sm text-[var(--muted)]">The page you’re looking for doesn’t exist.</div>
        <div className="mt-6">
          <Link to="/">
            <Button type="button" variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

