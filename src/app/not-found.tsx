import "./globals.css";

// Shown only for URLs outside every locale (the proxy redirects almost everything to /en, /mr or /hi).
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center justify-center bg-bg p-6 text-center text-fg">
        <main>
          <p className="text-sm font-semibold text-gold">404</p>
          <h1 className="mt-2 text-2xl font-bold">Page not found · पान सापडले नाही · पेज नहीं मिला</h1>
          <a href="/en" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-fg">
            Ichalkaranji City Portal
          </a>
        </main>
      </body>
    </html>
  );
}
