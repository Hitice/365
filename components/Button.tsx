import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "compact";
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT = {
  primary: "bg-accent-500 text-white dark:text-navy-950 hover:brightness-90",
  secondary:
    "border border-border-strong bg-border text-foreground hover:bg-border-strong",
};

const SIZE = {
  default: "px-6 text-sm",
  compact: "px-4 text-sm",
};

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-semibold transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  icon,
  href,
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`;

  if (href) {
    const { target, rel, download } = rest as ButtonAsLink;
    return (
      <a href={href} target={target} rel={rel} download={download} className={classes}>
        {icon}
        {children}
      </a>
    );
  }

  const { onClick, type = "button" } = rest as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  );
}
