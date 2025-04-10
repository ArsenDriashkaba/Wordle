import { forwardRef, type HTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const paragraphStyles = tv({
  base: "text-black",
  variants: {
    size: {
      sm: "tracking-wider",
      md: "",
      lg: "",
    },
    weight: {
      regular: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    weight: "regular",
    size: "md",
  },
});

export type ParagraphProps = VariantProps<typeof paragraphStyles> &
  HTMLAttributes<HTMLParagraphElement>;

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ size, weight, children, className, ...restProps }, ref) => {
    return (
      <p
        ref={ref}
        className={paragraphStyles({ size, weight, className })}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);
