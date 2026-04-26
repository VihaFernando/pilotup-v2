import Head from "next/head";

const SITE_URL = "https://pilotup.io";

type DocsErrorStateProps = {
  message: string;
  title?: string;
  noIndex?: boolean;
};

export function DocsErrorState({ message, title = "Documentation", noIndex = true }: DocsErrorStateProps) {
  return (
    <div className="min-h-screen bg-white px-6 py-20 text-slate-800 antialiased dark:bg-[#2b2b2b] dark:text-[#ececec]">
      <Head>
        <title>Documentation | PilotUP</title>
        <meta name="description" content="PilotUP product documentation" />
        {noIndex ? <meta name="robots" content="noindex" /> : null}
        <link rel="canonical" href={`${SITE_URL}/docs`} />
      </Head>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-4 text-slate-600 dark:text-[#a3a3a3]">{message}</p>
        <a
          href="/"
          className="mt-8 inline-block font-medium text-[rgb(252,94,86)] underline-offset-2 hover:underline"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
