const ErrorFallback = ({
  error,
  resetErrorBoundary
}: {
  error: Error;
  resetErrorBoundary: () => void;
}): JSX.Element => {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-3">
      <div role="alert">
        <div className="rounded-t bg-error px-4 py-2 font-bold text-on-error">
          Oops!
        </div>
        <div className="flex flex-col rounded-b border border-t-0 border-error bg-error-container px-4 py-3 text-on-error-container">
          <h2>Something went wrong:</h2>
          <pre className="whitespace-pre-wrap break-all">{error.message}</pre>
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="mx-auto mt-5 h-12 w-24 whitespace-nowrap rounded-lg border border-error bg-on-error px-5 py-2.5 text-center text-sm font-medium text-error hover:bg-error hover:text-on-error focus:ring-4 focus:ring-error/25"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
};

export { ErrorFallback };
