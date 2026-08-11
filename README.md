# ChatGPT-Inspired Swipe Menu for React Native

Example of a layered swipe menu inspired by the ChatGPT mobile app. Swipe right anywhere on the chat surface to reveal the menu, then swipe left or tap the exposed surface to close it.

The menu stays mounted underneath the main chat surface while Reanimated and Gesture Handler drive the interaction on the UI thread. The result is a responsive, interruptible gesture with spring motion, rounded corners, shadows, and light haptic feedback with Pulsar.

## Watch the demo 👇

(coming soon)

## Setup

```bash
# clone the repo, then:
bun install
bun run ios
bun run android
```

## Keep Building with Code with Beto

The app icon in this project was generated and configured with the open-source [`app-icon` skill](https://github.com/Code-with-Beto/skills#-app-icon-plugin). It handles the Expo configuration for iOS 26 icons and Android adaptive icons directly from a prompt.

If you build with Codex, Claude, Cursor, or another AI agent, the [Code with Beto MCP](https://codewithbeto.dev/blog/introducing-cwb-mcp) gives Pro members access to course lessons, blog posts, and production templates inside the editor. For example, you can prompt your agent:

> Use Code with Beto to find the Animations & Gestures lessons, then help me build a swipeable drawer.

AI can help you move faster, but understanding the fundamentals is what lets you debug and ship confidently. The [React Native course](https://cwb.sh/rn?r=github) covers Reanimated, Gesture Handler, swipeable components, Expo Router, native UI, and the full path to the app stores.

Need hands-on help for your app or team? [Contact Beto on LinkedIn](https://www.linkedin.com/in/betomoedano).

## License

[MIT](LICENSE)

This project is inspired by the interaction pattern in ChatGPT and is not affiliated with or endorsed by OpenAI.
