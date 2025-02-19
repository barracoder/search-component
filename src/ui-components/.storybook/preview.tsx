// .storybook/preview.ts
import React from "react";
import { Preview } from "@storybook/react";
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
} from "@fluentui/react-components";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const theme =
        context.globals.theme === "dark" ? teamsDarkTheme : teamsLightTheme;
      return (
        <FluentProvider theme={theme}>
          <Story />
        </FluentProvider>
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        state: "open", // Makes source code visible by default for all stories
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
      },
    },
  },
};

export default preview;
