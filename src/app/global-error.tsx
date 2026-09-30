"use client";

// Last-resort error page, used only if the root layout itself fails.
// It replaces the whole document, so styles are inline.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0f1e", color: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "0 16px" }}>
          <div style={{ maxWidth: 480 }}>
            <h1 style={{ fontSize: 32, fontWeight: 600, margin: "0 0 12px" }}>Something went wrong.</h1>
            <p style={{ color: "#a3b1c6", margin: "0 0 24px", lineHeight: 1.6 }}>
              Please try again. If it keeps happening, email fares.khanchouch@gmail.com.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{ background: "#2e6ec0", color: "#fff", border: 0, borderRadius: 6, padding: "12px 20px", fontSize: 14, cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
