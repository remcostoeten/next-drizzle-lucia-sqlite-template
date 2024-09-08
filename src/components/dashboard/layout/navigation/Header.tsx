'use client';

import Input from "@/components/elements/Search";
import Logo from "@/components/theme/Logo";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { searchOptions } from "@/core/config/search-options";
import { Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import UserMenu from "./UserMenu";

type User = {
  id: string;
  username: string;
  email: string;
} | null;

type HeaderProps = {
  user: User;
};

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-black text-white p-4 border-b ">
      <div className="mx-auto flex justify-between items-center max-w-7xl">
        <Logo />

        <div className="flex-1 mx-4 flex justify-center">
          <Input
            isSearch={true}
            backdropOpacity={0.4}
            backdropBlur='xl'
            backdropColor='black'
            searchOptions={searchOptions}
            hasBlur={true}
            width="md"
            className="max-w-xl w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-neutral-300 hover:text-white" aria-label="Help">
                <HelpCircle size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-neutral-300 hover:text-white" aria-label="Notifications">
                <Bell size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild variant="secondary">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
