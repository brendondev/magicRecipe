import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { ChefHat } from "@phosphor-icons/react";


type NavItemProps = {
  label: string
  href: string
}

export const NavItem = ({label, href}: NavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} className={cn(
      "text-gray-400 flex items-center gap-2 font-medium font-mono",
      isActive && 'text-gray-50'
    )}>
      <span>
      <ChefHat
        size={22} className={cn(
          "text-gray-400",
          isActive && "text-red-400"
        )}
      />
      </span>
      {label}
    </Link>
  )
}