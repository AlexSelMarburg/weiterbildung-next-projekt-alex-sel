import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  return <main className="about-page"></main>;
}
