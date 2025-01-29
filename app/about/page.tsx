import { getAboutPage } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import SmallAndEmpty from "@/components/banners/SmallAndEmpty";
import Link from "next/link";
import type { Metadata } from "next";



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getAboutPage();

  const seo = post?.yoast_head_json;

// TO DO : make sure that everything is working fine & make sure featured image is working

  return {
    title: seo?.title || "",
    description: seo?.description || "",
    keywords: seo?.focuskw ? [seo.focuskw] : undefined, // Keyphrase
    alternates: {
      canonical: seo?.canonical || undefined, // Canonical URL
    },
    openGraph: {
      title: seo?.og_title || seo?.title || "",
      description: seo?.og_description || seo?.description || "",
      url: seo?.canonical || undefined,
      siteName: seo?.og_site_name || undefined,
      images: seo?.og_image ? seo.og_image.map((img: any) => ({ url: img.url })) : undefined,
      type: seo?.og_type || "",
    },
    twitter: {
      card: seo?.twitter_card || "",
      title: seo?.twitter_title || seo?.title || "",
      description: seo?.twitter_description || seo?.description || "",
      images: seo?.twitter_image ? [{ url: seo.twitter_image }] : undefined,
    },
  };
}

export default async function Page() {
  const pages = await getAboutPage(); // Fetch inside the function

  console.log(pages);

  return (
    <Section>
      <SmallAndEmpty />
      <div className="about">
      </div>
      <Container >
        
        <Prose >
          <h2> About Page</h2>
        </Prose>

      </Container>
    </Section>
  );
}
