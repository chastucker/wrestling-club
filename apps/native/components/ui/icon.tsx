import { cn } from "@/lib/utils";
import { cssInterop } from "nativewind";
import { Feather } from "@expo/vector-icons";
import type { ComponentProps, ComponentType } from "react";

type FeatherName = keyof typeof Feather.glyphMap;

type BaseProps = Omit<ComponentProps<typeof Feather>, "name"> & {
  className?: string;
  size?: number;
};

type IconProps = BaseProps &
  (
    | { as: ComponentType<any>; name?: never }
    | { as?: never; name: FeatherName }
  );

function IconImpl({
  as: IconComponent,
  ...props
}: { as: ComponentType<any> } & BaseProps) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: "size",
      width: "size",
    },
  },
});

/**
 * Icon component with two modes:
 * - Provide `name` to use a Feather icon from `@expo/vector-icons`
 * - Provide `as` to render any custom icon component
 */
function Icon(props: IconProps) {
  const {
    className,
    size = 14,
    color,
  } = props as BaseProps & {
    name?: FeatherName;
    as?: ComponentType<any>;
  };

  if ("as" in props && props.as) {
    const { as, ...other } = props as { as: ComponentType<any> } & BaseProps;
    return (
      <IconImpl
        as={as}
        className={cn("text-foreground", className)}
        size={size}
        color={color}
        {...other}
      />
    );
  }

  if ("name" in props && props.name) {
    const { name, ...other } = props as { name: FeatherName } & BaseProps;
    return (
      <IconImpl
        as={(p) => <Feather name={name} {...p} />}
        className={cn("text-foreground", className)}
        size={size}
        color={color}
        {...other}
      />
    );
  }

  throw new Error("Icon: either `name` or `as` prop is required");
}

export { Icon };
