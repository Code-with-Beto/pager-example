# CWB Swipe Menu for React Native

A focused Expo example of a display-like swipe menu inspired by the ChatGPT mobile app. Swipe right anywhere on the main surface to browse Code with Beto resources, real course lessons, and a small list of recent chats. Swipe left or tap the exposed surface to close it.

The menu stays mounted underneath a single moving surface. Reanimated and Gesture Handler update only the horizontal translation on the UI thread, so the surface keeps the same continuous corner shape for the entire gesture.

## Watch the demo 👇

[Watch the CWB Swipe Menu demo on X](https://x.com/betomoedano/status/2087271429007966658?s=20)

## Setup

```bash
# Clone the repo, then:
bun install
bun run ios
bun run android
```

Run the static TypeScript check with `bun run typecheck`.

## What the example includes

- A swipe menu with clearly named, hard-coded gesture and spring values
- Code with Beto offerings and real React Native course lesson examples
- Cross-platform icons from Expo Symbols
- Liquid Glass bottom actions on supported iOS versions, with a solid fallback elsewhere
- A simple Expo Router profile modal
- Recent chats kept as lightweight example content

## Screen-shaped corners

The corner radius does not animate. The whole surface has its final curve before it starts moving, which makes the interaction feel like the display itself is sliding to the right.

The local `screen-corner-surface` Expo module uses Apple's public concentric-corner API on iOS 26 and resolves the radius once while the surface is full-screen. It then freezes that value for the swipe. The module intentionally avoids the private `_displayCornerRadius` API used by ScreenCorners.

The exact native iOS behavior requires a development build (`bun run ios`). Expo Go remains supported through an optional-module fallback. The named fallbacks live in `constants.ts`:

- iOS 16.4–25 and Expo Go: 55 points
- Android: 32 points
- Web: 28 points

## Project structure

```text
modules/
└── screen-corner-surface/      # Optional local iOS corner surface
    ├── ios/                    # Public concentric-corner implementation
    └── src/                    # Native view and cross-platform fallback
src/
├── app/                        # Expo Router routes
│   ├── _layout.tsx             # Stack and gesture root
│   ├── index.tsx               # Swipe menu route
│   └── profile.tsx             # Modal profile route
└── features/swipe-menu/
    ├── components/             # Menu, glass dock, and moving content
    ├── hooks/                  # Swipe gesture and system theme
    ├── swipe-menu-screen.tsx   # Feature composition and screen state
    ├── profile-screen.tsx      # Simple routed profile screen
    ├── constants.ts            # Content, colors, and named fixed values
    └── types.ts                # Shared feature types
```

## Keep building with Code with Beto

The [Code with Beto MCP](https://codewithbeto.dev/blog/introducing-cwb-mcp) gives Pro members access to course lessons, blog posts, and production templates inside the editor. For example, you can prompt your agent:

> Use Code with Beto to find the Animations & Gestures lessons, then help me build a swipe menu.

AI can help you move faster, but understanding the fundamentals is what lets you debug and ship confidently. The [React Native course](https://cwb.sh/rn?r=github) covers Reanimated, Gesture Handler, swipeable components, Expo Router, native UI, and the full path to the app stores.

You can also explore the [Platano AI image app template](https://cwb.sh/platano), the open-source [Code with Beto skills](https://github.com/Code-with-Beto/skills), and the [YouTube channel](https://cwb.sh/youtube).

## License

[MIT](LICENSE)

This project is inspired by the interaction pattern in ChatGPT and is not affiliated with or endorsed by OpenAI.
