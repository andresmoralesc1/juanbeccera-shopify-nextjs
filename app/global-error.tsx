'use client';

export default function GlobalError({ reset }: {
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold">Error Global</h2>
            <p className="mb-6 text-gray-600">
              Ha ocurrido un error crítico. Por favor, recarga la página.
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Recargar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
