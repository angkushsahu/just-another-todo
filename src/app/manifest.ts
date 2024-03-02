import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "Just Another Todo",
      short_name: "just_another_todo",
      description:
         "Streamlined todo website for managing tasks effortlessly. Simplify your day-to-day with intuitive task organization and tracking. Stay productive with a user-friendly interface designed for seamless task management.",
      start_url: "/",
      scope: "/",
      id: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ea580c",
      icons: [
         {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
         },
         {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
         },
         {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
         },
         {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
         },
      ],
   };
}
