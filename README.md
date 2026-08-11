# Layered Drawer Gesture Example

A minimal Expo SDK 57 prototype of the layered drawer interaction used by apps such as ChatGPT. The menu remains mounted underneath the main chat surface while Reanimated and Gesture Handler drive the reveal animation on the UI thread.

This intentionally does not use [`PagerView`](https://docs.expo.dev/versions/v57.0.0/sdk/ui/drop-in-replacements/pagerview/). Pager pages always stretch to fill the viewport, while this interaction needs the chat surface to stop partially onscreen and cast a shadow over the menu. The menu does use universal `@expo/ui` controls for the native new-chat button and appearance switch.

## Run

```bash
bun install
bun run ios
```

Use `bun run android` for Android. Swipe right anywhere on the chat to open the menu. Swipe left or tap the exposed chat surface to close it. Selecting a recent chat loads it and closes the menu.

## Learn React Native with Code with Beto

Build production-ready apps with React Native, Expo, and TypeScript through practical, project-based courses.

[Explore the React Native courses →](https://cwb.sh/rn?r=github)

Pro members also get real-world app codebases, private GitHub projects, Figma files, and priority Discord support.

## License

[MIT](LICENSE)
