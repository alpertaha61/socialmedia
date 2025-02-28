"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";


function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    setClicked(true); // Tıklama animasyonunu başlat

    try {
      await toggleFollow(userId); // Buradaki toggleFollow fonksiyonunu projenize göre uyarlayın
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className={`relative w-20 overflow-hidden transition-all transform hover:scale-110 ${
        clicked ? "bg-red-500" : ""
      }`}
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        "Follow"
      )}

      {/* Patlama efekti */}
      {clicked && (
        <>
          <div className="particle-effect" />
          <div className="particle-effect" />
          <div className="particle-effect" />
          <div className="particle-effect" />
          <div className="particle-effect" />
        </>
      )}
    </Button>
  );
}

export default FollowButton;