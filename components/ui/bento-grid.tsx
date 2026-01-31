import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[14rem] grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  name,
  description,
  href,
  cta,
  background,
  Icon,
  children,
}: {
  className?: string;
  name?: string;
  description?: string;
  href?: string;
  cta?: string;
  background?: ReactNode;
  Icon?: React.ElementType | (() => ReactNode);
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl",
        className
      )}
    >
      {background}
      {children ? (
        children
      ) : (
        <div className="relative z-10">
          {Icon && (
            <div className="mb-4">
              {typeof Icon === "function" ? <Icon /> : <Icon className="h-8 w-8 text-gray-600 dark:text-gray-300" />}
            </div>
          )}
          {name && (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {name}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>
          )}
          {href && cta && (
            <a
              href={href}
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {cta}
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
