import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat } from "@phosphor-icons/react";

type NavItemProps = {
  label: string;
  href: string;
};

export const NavItem = ({ label, href }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-gray-400 text-lg flex items-center gap-2 font-flower",
        isActive && "text-gray-50"
      )}
    >
      <span>
        <ChefHat
          size={22}
          className={cn("text-gray-400", isActive && "text-red-400")}
        />
      </span>
      {label}
    </Link>
  );
};
