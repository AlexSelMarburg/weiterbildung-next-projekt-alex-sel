"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <main className="error-page">
      <h2>Ein Fehler ist aufgetreten</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Nochmal versuchen</button>
    </main>
  );
}
