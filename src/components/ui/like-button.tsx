"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { incrementProjectLike } from "@/app/actions/likes";
import { track } from "@vercel/analytics";

interface LikeButtonProps {
  projectId: string;
  initialLikes: number;
}

export function LikeButton({ projectId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (hasLiked || isPending) return;

    // Optimistic update
    setLikes((prev) => prev + 1);
    setHasLiked(true);
    track("Project Liked", { projectId });

    startTransition(async () => {
      const result = await incrementProjectLike(projectId);
      if (!result.success) {
        // Revert optimistic update on failure
        setLikes((prev) => prev - 1);
        setHasLiked(false);
      } else if (result.likes !== undefined) {
        // Ensure accurate count from server
        setLikes(result.likes);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || isPending}
      className={`group flex items-center gap-2 h-10 px-4 rounded-full border transition-all ${
        hasLiked 
          ? "bg-red-500/10 border-red-500/20 text-red-500" 
          : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground active:scale-95"
      }`}
      aria-label="Like project"
    >
      <Heart 
        className={`h-4 w-4 transition-all ${
          hasLiked ? "fill-red-500 text-red-500 scale-110" : "group-hover:scale-110"
        }`} 
      />
      <span className="font-mono text-sm font-medium">{likes}</span>
    </button>
  );
}