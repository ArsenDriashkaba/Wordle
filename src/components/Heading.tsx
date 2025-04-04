import { forwardRef, type HTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const headingStyles = tv({
  base: "font-bold tracking-tighter",
  variants: {
    variant: {
      h1: "",
      h2: "",
      h3: "",
      h4: "tracking-normal",
      h5: "tracking-wide",
      h6: "tracking-wider",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export type HeadingProps = VariantProps<typeof headingStyles> &
  HTMLAttributes<HTMLHeadingElement>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ variant: Component = "h1", children, className, ...restProps }, ref) => {
    return (
      <Component
        ref={ref}
        className={headingStyles({ variant: Component, className })}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);
