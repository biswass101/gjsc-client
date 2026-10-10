import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Glorious Japan Skin Care</p>
        <h1 className="mt-3 font-display text-7xl text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
          Return home
        </Link>
      </div>
    </main>
  );
}