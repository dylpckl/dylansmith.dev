import { Landing } from "@/components/landing/Landing";

// The Writing frame is hidden for now, so the landing page doesn't load posts.
// To bring it back, restore getAllPosts() here (see Landing.tsx).
export default function Home() {
  return <Landing />;
}
