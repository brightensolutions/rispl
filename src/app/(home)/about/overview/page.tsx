import AboutModern from "./about-modern";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | RISPL",
  description:
    "Learn about our company, our values, and our mission to provide the best packaging solutions.",
};

export default function AboutPage() {
  // Pass nothing, AboutModern already has static defaultContent
  return <AboutModern />;
}
