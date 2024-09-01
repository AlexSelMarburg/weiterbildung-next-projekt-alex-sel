"use client";

import Link from "next/link";
import { linkTargets } from "./_components/MainNavigation";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <h2>Zu dieser URL wurde leider nichts gefunden!</h2>

      <div className="info-container">
        <p>Versuchen Sie es doch mit einem der folgenden Links:</p>
        <ul>
          {linkTargets.map(({ text, url }) => (
            <li key={url}>
              <Link href={url}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
