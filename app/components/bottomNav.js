"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Type, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/lessons", label: "Learn", icon: BookOpen },
    { href: "/dashboard/alphabets", label: "Alphabets", icon: Type },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/leaderboard", label: "Leaderboard", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white py-2 shadow-inner md:hidden">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs ${
              active ? "text-green-600" : "text-gray-500 hover:text-green-500"
            }`}
          >
            <Icon className="h-5 w-5 mb-0.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}