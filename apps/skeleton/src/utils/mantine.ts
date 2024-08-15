"use client";

import {
  Alert,
  Button,
  createTheme,
  MantineTheme,
  Menu as MantineMenu,
  Modal,
  Notification,
  rgba,
  Select,
  Switch,
} from "@mantine/core";

const theme = createTheme({
  colors: {
    faastsaas: [
      "#e5f4ff",
      "#cde2ff",
      "#9bc2ff",
      "#64a0ff",
      "#3984fe",
      "#1d72fe",
      "#0969ff",
      "#0058e4",
      "#004ecc",
      "#0043b5",
    ],
  },

  components: {
    Alert: Alert.extend({
      classNames: {
        icon: "mt-0 justify-center",
        message: "flex flex-col gap-4",
      },
    }),
    Button: Button.extend({
      classNames: {
        root: "font-normal",
      },
    }),
    Notification: Notification.extend({}),
    Menu: MantineMenu.extend({
      classNames: {
        divider: "my-0",
      },
    }),
    Modal: Modal.extend({
      classNames: {
        title: "text-xl font-bold",
        inner: "px-4 py-4",
      },
    }),
    Select: Select.extend({
      classNames: {
        dropdown: "rounded-t-none border-t-0 border-primary",
        input: "data-[expanded='true']:rounded-b-none",
      },
      defaultProps: {
        comboboxProps: {
          transitionProps: { transition: "pop", duration: 250 },
          offset: 0,
        },
      },
    }),
    Switch: Switch.extend({
      classNames: {
        root: "group",
        thumb:
          "w-[18px] h-[18px] left-[0px] group-has-[:checked]:left-[calc(100%-18px)] border-0",
      },
    }),
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },

  defaultRadius: "md",
  primaryColor: "faastsaas",
  primaryShade: 5,
});

const changeMantineHashColorToTailwind = (
  colorString: string,
  withComma = true
) => {
  const str = rgba(colorString, 1).replace("rgba(", "").replace(", 1)", "");

  if (withComma) {
    return str.replaceAll(",", "");
  }

  return str;
};

const cssVariablesResolver = (theme: MantineTheme) => {
  const tailwindVariables: Record<string, string> = {};

  Object.keys(theme.colors).map((color) => {
    theme.colors[color].map((colorString, j) => {
      tailwindVariables[`--mantine-tailwind-${color}-color-${j}`] =
        changeMantineHashColorToTailwind(colorString);

      tailwindVariables[`--mantine-tailwind-raw-${color}-color-${j}`] =
        changeMantineHashColorToTailwind(colorString, false);

      if (theme.primaryShade === j) {
        tailwindVariables[`--mantine-tailwind-${color}-color-default`] =
          changeMantineHashColorToTailwind(colorString);

        tailwindVariables[`--mantine-tailwind-raw-${color}-color-default`] =
          changeMantineHashColorToTailwind(colorString, false);
      }
    });
  });

  theme.colors[theme.primaryColor].map((colorString, i) => {
    tailwindVariables[`--mantine-tailwind-primary-color-${i}`] =
      changeMantineHashColorToTailwind(colorString);

    tailwindVariables[`--mantine-tailwind-raw-primary-color-${i}`] =
      changeMantineHashColorToTailwind(colorString, false);

    if (theme.primaryShade === i) {
      tailwindVariables[`--mantine-tailwind-primary-color-default`] =
        changeMantineHashColorToTailwind(colorString);

      tailwindVariables[`--mantine-tailwind-raw-primary-color-default`] =
        changeMantineHashColorToTailwind(colorString, false);
    }
  });

  return {
    variables: tailwindVariables,
    dark: {},
    light: {},
  };
};

export const mantine = {
  theme,
  cssVariablesResolver,
};
