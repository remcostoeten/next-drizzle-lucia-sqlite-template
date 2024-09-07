'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { sidebarConfig } from '@/core/config/dashboard-menu-item';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

function SidebarItem({ icon: Icon, label, href, isActive }: SidebarItemProps) {
  return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              'flex h-[55px] w-[55px] cursor-pointer flex-col items-center justify-center rounded-[16.5px] text-white transition-colors duration-200',
              isActive ? 'bg-neutral-800 opacity-100' : 'opacity-30 hover:opacity-50'
            )}
          >
            <Icon className="h-6 w-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
  );
};

function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href);

  return (
    <div className="flex h-full w-[88px] flex-col justify-between bg-neutral-950 p-4">
      <div className="flex flex-col space-y-6">
        {sidebarConfig.map((section, index) => (
          <div key={index} className="flex flex-col space-y-6">
        {section.items.map((item) => (
  <SidebarItem
    key={item.label}
    icon={item.icon}
    label={item.label}
    href={item.href}
    isActive={isActive(item.href)}
  />
))}
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-6">
        {sidebarConfig
          .filter((section) => section.position === 'bottom')
          .map((section) =>
            section.items.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={isActive(item.href)}
              />
            ))
          )}
      </div>
    </div>
  );
};

export default Sidebar;
