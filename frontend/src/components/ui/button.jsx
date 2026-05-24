import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-acid-lime text-black hover:bg-acid-lime/90 border border-acid-lime/40",
  secondary:
    "bg-transparent text-foreground hover:bg-white/5 border border-white/20",
};

export default function Button({
  children,
  className,
  variant = "primary",
  asChild = false,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
