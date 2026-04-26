import Image from "next/image";

const CARD_IMAGE = {
    handshake: { src: "/handshake.png", alt: "Hire experts" },
    card: { src: "/card-1.png", alt: "AI platform card preview" },
    availability: { src: "/availability.png", alt: "24/7 availability" },
} as const;

const ValueProps = () => {
    return (
        <section data-gsap="fade-up" className="relative mx-auto w-full max-w-[1280px] overflow-hidden px-6 py-6 sm:py-10">
            <div className="relative z-10">
                <div className="mx-auto max-w-7xl px-6 py-4 sm:py-4">
                    <div data-gsap="fade-up" className="mb-10 text-center sm:mb-14">
                        <h3 className="text-4xl font-bold leading-[1.02] text-gray-900">
                            Why Founders Would Love our <br className="hidden sm:block" />
                            <span className="-mt-1 block">Platform</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div data-gsap="fade-up">
                            <div className="mb-5 overflow-hidden rounded-2xl border-4 border-gray-400 bg-black">
                                <Image
                                    {...CARD_IMAGE.handshake}
                                    width={800}
                                    height={200}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="h-[200px] w-full object-cover"
                                />
                            </div>

                            <h4 className="mb-2 font-bold text-gray-900">Hire Experts, Pay Intern Rates</h4>

                            <p className="text-sm leading-relaxed text-gray-500">
                                Build your employee from the ground up, tailored exactly to your needs.{" "}
                                <b>No downtime, no distractions,just consistent execution. </b>
                                Reliable AI employees handle complex work so you can focus on growing your business forward.
                            </p>
                        </div>

                        <div data-gsap="fade-up">
                            <div className="mb-5 overflow-hidden rounded-2xl border-4 border-gray-400 bg-black">
                                <Image
                                    {...CARD_IMAGE.card}
                                    width={800}
                                    height={200}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="h-[200px] w-full object-cover"
                                />
                            </div>

                            <h4 className="mb-2 text-left font-bold text-gray-900">Work as a real team, not just a tool.</h4>

                            <p className="text-left text-sm leading-relaxed text-gray-500">
                                Your AI employees don’t work alone. They share context, learn from each other, and stay aligned across sales and
                                growth. No disconnected tools. <b>A team that works together.</b>
                            </p>
                        </div>

                        <div data-gsap="fade-up">
                            <div className="mb-5 overflow-hidden rounded-2xl border-4 border-gray-400 bg-black">
                                <Image
                                    {...CARD_IMAGE.availability}
                                    width={800}
                                    height={200}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="h-[200px] w-full object-cover"
                                />
                            </div>

                            <h4 className="mb-2 font-bold text-gray-900">AI Employees work around the clock</h4>

                            <p className="text-sm leading-relaxed text-gray-500">
                                Always on, always working. Your AI employee operates 24/7 without breaks or downtime.{" "}
                                <b>Progress continues even when you’re offline.</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
