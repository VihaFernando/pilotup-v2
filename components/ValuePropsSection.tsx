import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Frown, Smile } from "lucide-react";

const LOGOS = [
    { name: "Slack", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Gmail", src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "GitHub", src: "https://img.icons8.com/?size=100&id=12599&format=png&color=000000" },
    { name: "ClickUp", src: "https://img.icons8.com/?size=100&id=znqq179L1K9g&format=png&color=000000" },
    { name: "Google Meet", src: "https://img.icons8.com/?size=100&id=pE97I4t7Il9M&format=png&color=000000" },
    { name: "VS Code", src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
    { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

type LogoItem = (typeof LOGOS)[number];

type MarqueeRowProps = {
    logos: LogoItem[];
    duration: number;
    reverse?: boolean;
};

function MarqueeRow({ logos, duration, reverse = false }: MarqueeRowProps) {
    const rowItems: Array<LogoItem | "blank"> = logos.flatMap((logo) => [logo, "blank"]);
    const doubled: Array<LogoItem | "blank"> = [...rowItems, ...rowItems];

    return (
        <div className="w-full overflow-hidden">
            <div
                className={`flex items-center gap-3 w-[200%] ${reverse ? "animate-infinite-marquee-reverse" : "animate-infinite-marquee"}`}
                style={{ animationDuration: `${duration}s` }}
            >
                {doubled.map((item, index) => (
                    <div
                        key={index}
                        className={item === "blank" ? "w-10 h-10 aspect-square flex items-center justify-center" : "w-12 h-12 aspect-square flex items-center justify-center"}
                    >
                        {item === "blank" ? (
                            <div className="w-full h-full rounded-md bg-[#121212] border border-[#333]" />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.name}
                                className="w-9 h-9 object-contain"
                                style={item.name === "GitHub" ? { filter: "invert(1)" } : undefined}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

const ValueProps = () => {
    const firstRow = LOGOS.slice(0, 4);
    const secondRow = LOGOS.slice(2, 6);
    const thirdRow = LOGOS.slice(4, 8);

    return (
        <section data-gsap="fade-up" className="relative py-6 px-6 w-full max-w-[1280px] mx-auto overflow-hidden sm:py-10">
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 sm:py-4">
                    <div data-gsap="fade-up" className="mb-10 text-center sm:mb-14">
                        <h1 className="text-4xl font-bold text-gray-900 leading-[1.02]">
                            Why Founders Would Love our <br className="hidden sm:block" />
                            <span className="block -mt-1">Platform</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div data-gsap="fade-up">
                            <div className="rounded-2xl overflow-hidden bg-black mb-5 border-4 border-gray-400">
                                <img
                                    src="handshake.png"
                                    alt="Hire experts"
                                    className="w-full h-[200px] object-cover"
                                />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-2">
                                Hire Experts, Pay Intern Rates
                            </h4>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                Build your employee from the ground up, tailored exactly to your needs. <b>
                                    No downtime, no distractions,just consistent execution. </b>
                                Reliable AI employees handle complex work
                                so you can focus on growing your business forward.
                            </p>
                        </div>

                        <div data-gsap="fade-up">
                            <div className="rounded-2xl overflow-hidden bg-black mb-5 border-4 border-gray-400">
                                <img
                                    src="card-1.png"
                                    alt="AI platform card preview"
                                    className="w-full h-[200px] object-cover"
                                />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-2 text-left">
                                Work as a real team, not just a tool.
                            </h4>

                            <p className="text-sm text-gray-500 leading-relaxed text-left">
                                Your AI employees don’t work alone. They share context, learn from each other, and stay aligned across sales and growth.
                                No disconnected tools. <b>A team that works together.</b>
                            </p>
                        </div>

                        <div data-gsap="fade-up">
                            <div className="rounded-2xl overflow-hidden bg-black mb-5 border-4 border-gray-400">
                                <img
                                    src="availability.png"
                                    alt="24/7 availability"
                                    className="w-full h-[200px] object-cover"
                                />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-2">
                                AI Employees work around the clock
                            </h4>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                Always on, always working. Your AI employee operates 24/7 without
                                breaks or downtime. <b>Progress continues even when you’re offline.</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ValueProps;

// Local marquee keyframes for the logo rows.
// Using two identical copies in the track makes the loop seamless at the midpoint.

