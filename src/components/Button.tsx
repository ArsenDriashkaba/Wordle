import { forwardRef, JSX } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: [
    "flex cursor-pointer items-center justify-center text-center gap-2 rounded-full font-medium transition-all duration-200 ease-in-out",
    "focus:outline-none focus-visible:border-transparent",
    "active:opacity-90",
    "disabled:cursor-not-allowed disabled:active:shadow-none",
  ],
  variants: {
    variant: {
      solid: "bg-primary text-black",
      outline: "border",
      ghost: "",
    },
    size: {
      md: "px-6 py-2.5 text-sm",
      lg: "px-12 py-4 text-lg",
      keyboard: "p-0",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

export type ButtonProps = VariantProps<typeof buttonStyles> &
  JSX.IntrinsicElements["button"];

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = "button", className, variant, size, ...rest }, ref) => {
    const styles = buttonStyles({
      variant,
      size,
      className,
    });

    return (
      <button ref={ref} className={styles} type={type} {...rest}>
        {children}
      </button>
    );
  }
);
