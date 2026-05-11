"use client"

export default function GlobalError( {
    error,
    reset,
}: { 
    error: Error;
    reset : () => void
}) {
    return (
         <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">
            Application Error
          </h1>

          <p>Something unexpected happened.</p>

          <button
            onClick={() => reset()}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
    )
}