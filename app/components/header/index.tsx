"use client";

import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./nav-item";
import React from "react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projetos",
    href: "/projects",
  },
];

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 w-full z-10 h-24 flex justify-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            width={90}
            height={50}
            src="/images/logo.svg"
            alt="Logo Receita Mágica"
          />
          <p>ABC</p>
        </Link>

        <nav className="flex items-center sm:gap-10 gap-4">
          {NAV_ITEMS.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
