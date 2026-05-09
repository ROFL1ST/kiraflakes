import Header from "@/components/landing/header";
import Hero from "@/components/landing/sections/homepage";
import Rules from "@/components/landing/sections/rules";
import Showcase from "@/components/landing/sections/showcase";
import Tnc from "@/components/landing/sections/Tnc";
import Footer from "@/components/landing/footer";
import Pricing from "@/components/landing/sections/Pricing";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: heroData },
    { data: rulesData },
    { data: showcaseData },
    { data: tncData },
    { data: pricingData }
  ] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("rules").select("*").order("sort_order", { ascending: true }),
    supabase.from("showcase_images").select("*").order("sort_order", { ascending: true }),
    supabase.from("tnc_items").select("*").order("sort_order", { ascending: true }),
    supabase.from("pricing_cards").select("*").order("sort_order", { ascending: true })
  ]);

  return (
    <>
      <Header />
      <Hero data={heroData} />
      <Rules data={rulesData || []} />
      <Showcase data={showcaseData || []} />
      <Tnc data={tncData || []} />
      <Pricing data={pricingData || []} />
      <Footer />
    </>
  );
}
