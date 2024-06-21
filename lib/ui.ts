import { createSystem } from "frog/ui";

export const { Box, Columns, Column, Image, Heading, Text, VStack, Spacer, vars } = createSystem({
  colors: {
    white: "rgba(255, 255, 255, 0.1)",
    black: "rgb(0,2,18)",
    fcPurple: "rgb(71,42,145)",
    purple: 'rgb(117,89,236)',
  },
  fonts: {
    default: [
      {
        name: "Space Mono",
        source: "google",
      },
    ],
  },
});