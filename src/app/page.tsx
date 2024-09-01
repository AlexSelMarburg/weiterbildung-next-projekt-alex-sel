import Image from "next/image";

import testBG from "@/public/TEST-img.jpg";

export default function HomePage() {
  return (
    <main className="home-page">
      <Image
        src={testBG}
        alt="test"
        fill
        className="home-page__bg"
        placeholder="blur"
        quality={80}
      />
      <div className="home-page__content">
        <h1>Home</h1>
        <p>Lorem ipsum dolor, sit amet consectetur</p>
      </div>
    </main>
  );
}
