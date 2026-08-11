import type { SymbolViewProps } from "expo-symbols";

export type Chat = {
  id: string;
  kind: "chat";
  prompt: string;
  response: string;
  title: string;
};

export type Offering = {
  description: string;
  href: string;
  icon: SymbolViewProps["name"];
  id: string;
  kind: "offering";
  title: string;
};

export type CourseLesson = {
  description: string;
  href: string;
  id: string;
  kind: "lesson";
  minutes: number;
  title: string;
};

export type MenuContent = Chat | CourseLesson | Offering;

export type ColorPalette = {
  accent: string;
  accentText: string;
  menuBackground: string;
  menuSelected: string;
  muted: string;
  separator: string;
  surfaceBackground: string;
  surfaceBorder: string;
  text: string;
  userBubble: string;
};
