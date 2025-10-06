export const revalidate = 0;
import connectDb from "@/lib/db/db";
import AboutModel from "@/lib/Models/about";
import AboutModern from "./about-modern";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | RISPL",
  description:
    "Learn about our company, our values, and our mission to provide the best packaging solutions.",
};

// Remove the content prop from the page component
export default async function AboutPage() {
  let aboutContent = null;

  try {
    await connectDb();
    const content = await AboutModel.findOne({});
    if (content) {
      aboutContent = content.toObject();
    }
  } catch (error) {
    console.error("Error fetching about content:", error);
    // Use default content if database fetch fails
  }

  // Pass the content as a prop to the AboutModern component
  return <AboutModern content={aboutContent} />;
}
