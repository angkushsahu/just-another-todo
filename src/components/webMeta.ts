import type { Metadata, Viewport } from "next";

const page = {
   title: "Just Another Todo",
   description:
      "Streamlined todo website for managing tasks effortlessly. Simplify your day-to-day with intuitive task organization and tracking. Stay productive with a user-friendly interface designed for seamless task management.",
};

export const viewportMeta: Viewport = {
   themeColor: "#ea580c",
   colorScheme: "dark light",
   width: "device-width",
   initialScale: 1,
};

export const webMeta: Metadata = {
   title: {
      default: page.title,
      template: `%s - ${page.title}`,
   },
   description: page.description,
   robots: { index: true, follow: true },
   keywords:
      "Task management, Todo list, Productivity tool, Organizational tool, Task tracking, Task planner, Task organizer, Workflow optimization, Time management, Efficiency booster",
   // extra SEO optimisations
   creator: "Angkush Sahu",
   publisher: "Angkush Sahu",
   applicationName: page.title,
   generator: "Next.js and Vercel", // TODO: change the hosting service here
   referrer: "origin-when-cross-origin",
   metadataBase: new URL("https://justanothertodo.vercel.app"), // TODO: change the url here
   authors: [{ name: "Angkush Sahu", url: "https://angkushsahu.vercel.app" }],
   openGraph: {
      title: page.title,
      description: page.description,
      images: [
         {
            url: "/og_image.png",
            width: 192,
            height: 192,
         },
      ],
   },
};
