"use server"
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
export async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-20">
      <Card className="bg-gradient-to-b from-white to-blue-500 dark:from-black dark:to-blue-600 transition-all ease-in-out duration-700 opacity-95 hover:opacity-100">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold text-black dark:text-white">{user.name}</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">{user.username}</p>
              </div>
            </Link>

            {user.bio && <p className="mt-3 text-sm text-muted-foreground dark:text-gray-300">{user.bio}</p>}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-black dark:text-white">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-300">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium text-black dark:text-white">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-300">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground dark:text-gray-300">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground dark:text-gray-300">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card className="bg-gradient-to-b from-white to-blue-500 dark:from-black dark:to-blue-600 transition-all ease-in-out duration-700 opacity-95 hover:opacity-50">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-black dark:text-white">Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground dark:text-gray-300 mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
