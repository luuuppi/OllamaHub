import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";

const buttonStyles = cva(
  "transition-colors duration-150 ease-in-out font-medium flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-accent-600 enabled:hover:bg-accent-700 enabled:active:bg-accent-800",
        secondary:
          "text-white border border-night-500 bg-night-800 enabled:hover:bg-night-700",
        tertiary:
          "text-night-300 enabled:hover:bg-night-700/30 enabled:active:bg-night-700/50",
        danger: "bg-red-500 enabled:hover:bg-red-600 enabled:active:bg-red-700",
      },
      size: {
        md: "flex gap-1 rounded-xl px-6 py-3",
        icon_md: "rounded-xl px-3 py-3",
        icon_sm: "rounded-lg px-2 py-2",
        icon_xs: "rounded-lg px-1 py-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = {
  leadingIcon?: ReactNode;
} & ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonStyles>;

const Button = forwardRef<ElementRef<"button">, ButtonProps>(
  ({ children, className, variant, size, leadingIcon, ...props }, ref) => {
    return (
      <button className={buttonStyles({ variant, size, className })} ref={ref} {...props}>
        {leadingIcon}
        {children}
      </button>
    );
  },
);

export default Button;
