import type { GetStaticProps } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HireFirstSection } from "@/components/HireFirstSection";

export default function WaitlistPage() {
    return (
        <div className="min-h-screen bg-brand-surface-alt">
            <Navigation />
            <main className="pt-20">
                <HireFirstSection />
            </main>
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
