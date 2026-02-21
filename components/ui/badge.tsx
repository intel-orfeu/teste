import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        glow: "border-cyan-500/50 text-cyan-600 dark:text-cyan-400 bg-cyan-100/50 dark:bg-cyan-950/30 shadow-[0_0_10px_rgba(6,182,212,0.1)] dark:shadow-[0_0_10px_rgba(34,211,238,0.2)]",
        danger: "border-red-500/50 text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-950/30",
        purple: "border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-950/30",
        success: "border-green-500/50 text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-950/30",
        yellow: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-100/50 dark:bg-yellow-950/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "glow" | "danger" | "purple" | "success" | "yellow" | null | undefined;
  children?: React.ReactNode;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };