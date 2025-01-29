'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
      <Button
        variant='ghost'
        size='icon'
        className="ghost w-full px-2.5"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun
          className={`h-[1.1rem] w-[1.2rem] transition-transform ${
            theme === "light" ? "rotate-0 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-[1.1rem] w-[1.2rem] transition-transform ${
            theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
        <span className='sr-only'>Toggle theme</span>
      </Button>
  );
}