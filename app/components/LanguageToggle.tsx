"use client";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "../lib/utils";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-muted/50 rounded-full p-0.5">
      <button
        onClick={() => setLanguage("ne")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
          language === "ne"
            ? "gradient-bg text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        नेपाली
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
          language === "en"
            ? "gradient-bg text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
