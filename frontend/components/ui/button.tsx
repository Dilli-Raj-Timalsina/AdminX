"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        toggle:
          "justify-between px-1.5 hover:text-foreground/80 rounded-sm cursor-default",
        "no-hover-ghost": "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;

  /**
   * If true, the button will have a loading spinner, if given truthy value
   */
  isLoading?: boolean;
  spinnerColor?: "primary" | "white";

  disabled?: boolean;
  /**
   * If true, the button will have pending state based on the form status
   */
  actionButton?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      spinnerColor = "primary",
      actionButton = false,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const actionPending = actionButton && pending;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-busy={isLoading || actionPending} // helpful for screen readers
        aria-disabled={isLoading || actionPending}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

function DemoButtons() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 m-auto ">
      <h1 className="text-2xl font-bold">Button Variants</h1>
      <div className="flex flex-row justify-center items-center gap-4 m-auto ">
        <Button variant="default">default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="toggle">toggle</Button>
        <Button variant="no-hover-ghost">no-hover-ghost</Button>
      </div>
      <h1 className="text-2xl font-bold">Button Sizes</h1>
      <div className="flex flex-row justify-center items-center gap-4 m-auto ">
        <Button size="default">default</Button>
        <Button size="sm">sm</Button>
        <Button size="lg">lg</Button>
        <Button size="icon">icon</Button>
        <Button isLoading spinnerColor="primary">
          loading
        </Button>
      </div>
    </div>
  );
}

export { Button, buttonVariants, DemoButtons };
