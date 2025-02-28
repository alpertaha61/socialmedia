import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import { syncUser } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import MobileNavbar from "./MobileNavbar";

import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Avatar component importu


export async function Navbar() {
  const user = await currentUser();
  if (user) {
    await syncUser();
  }

  return (
    <nav className="sticky top-0 w-full bg-background/90 z-50 transition-all ease-in-out duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider flex items-center gap-2"
            >
              {/* Eğer kullanıcı varsa, küçük profil fotoğrafı gösterilecek, yoksa "Socially" yazısı */}
              {user ? (
                <Avatar className="w-8 h-8"> {/* Boyut küçültüldü */}
                  <AvatarImage src={user.imageUrl ?? "/avatar.png"} alt="User Profile" />
                </Avatar>
              ) : (
                "Socially"
              )}
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
