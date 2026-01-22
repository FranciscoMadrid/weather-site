import React from "react";

export interface NavLinkProps {
  title: string;
  href: string;
  className?: string;
  isDropdown?: boolean;
  hasUnderline?: boolean;
  underlineClassName?: string;
}

export default function NavLink({
  title,
  href,
  className = "",
  hasUnderline = false,
  underlineClassName = "h-0.5 bg-black bottom-0",
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={`${className} group inline-block relative`}
    >
      <span>{title}</span>

      {hasUnderline && (
        <div
          className={`w-full ${underlineClassName} absolute rounded-full left-0 origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
        />
      )}
    </a>
  )
}
