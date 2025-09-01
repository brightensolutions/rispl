import { PageTitle } from "@/components/other-page-title";
import ServiceSection from "@/components/service-section";
import connectDb from "@/lib/db/db";
import IndustryModel from "@/lib/Models/industry";
import { notFound } from "next/navigation";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectDb();

  const { slug } = await params;
  // Decode the URL slug to handle spaces and special characters
  const decodedSlug = decodeURIComponent(slug);

  try {
    // Try to find the industry by slug (exact match)
    let industry = await IndustryModel.findOne({
      slug: decodedSlug,
      isActive: true,
    });

    // If not found, try a case-insensitive search (use escaped slug for safety)
    if (!industry) {
      industry = await IndustryModel.findOne({
        slug: { $regex: new RegExp(`^${escapeRegex(decodedSlug)}$`, "i") },
        isActive: true,
      });
    }

    // If still not found, try to find by title (for backward compatibility)
    if (!industry) {
      industry = await IndustryModel.findOne({
        title: decodedSlug,
        isActive: true,
      });
    }

    // If industry not found, show 404
    if (!industry) {
      console.log(`Industry not found for slug: ${decodedSlug}`);
      notFound();
    }

    // Convert Mongoose document to plain object to avoid hydration issues
    const industryData = JSON.parse(
      JSON.stringify(industry.toObject ? industry.toObject() : industry)
    );

    return (
      <div className="overflow-hidden">
        <PageTitle
          title={industryData.pageTitle}
          backgroundImage={industryData.headerImage}
          subtitle={industryData.pageSubtitle}
        />

        <ServiceSection
          pageTitle={industryData.pageTitle}
          pageSubtitle={industryData.pageSubtitle}
          headerImage={industryData.headerImage}
          mainTitle={industryData.mainTitle}
          highlightedTitle={industryData.highlightedTitle}
          mainDescription={industryData.mainDescription}
          cards={industryData.cards}
          bottomDescription={industryData.bottomDescription}
          buttonText={industryData.buttonText}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching industry:", error);
    notFound();
  }
}

// Generate static params for all industries
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    await connectDb();
    const industries = await IndustryModel.find({ isActive: true }).select(
      "slug"
    );
    return industries.map((industry) => ({
      slug: industry.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
