'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

function SettingsSubmenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'flex h-[55px] w-[55px] cursor-pointer flex-col items-center justify-center rounded-[16.5px] text-white transition-colors duration-200',
                isOpen ? 'bg-neutral-800 opacity-100' : 'opacity-30 hover:opacity-50'
              )}
            >
              <Settings className="h-6 w-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isOpen && (
        <div className="absolute bottom-full left-full mb-2 ml-2 w-48 rounded-md bg-neutral-800 p-2 shadow-lg">
          <Link href="/settings/general" className="block py-2 px-4 text-white hover:bg-neutral-700">
            General
          </Link>
          <Link href="/settings/profile" className="block py-2 px-4 text-white hover:bg-neutral-700">
            Profile
          </Link>
          <Link href="/settings/security" className="block py-2 px-4 text-white hover:bg-neutral-700">
            Security
          </Link>
        </div>
      )}
    </div>
  );
};

export default SettingsSubmenu;
