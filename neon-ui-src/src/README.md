# Neon UI — Reusable React Component Library

A themeable React + Vite component library featuring interactive neon-styled
buttons, text inputs, and profile cards with live color theming.

## Why this project matters

Instead of writing new button/input/card markup every time one is needed,
this project defines each UI piece **once** as a component that accepts
`color` and `size` (and other) props. The same component is then reused
throughout the app to produce different-looking results — no duplicated
JSX, no duplicated CSS.

## Atomic Design mapping

This library follows the Atomic Design pattern (atoms → molecules → pages):

| Atomic Design Level | Component        | Why it belongs here |
|----------------------|------------------|----------------------|
| **Atom**             | `Buttons.jsx`    | Smallest, single-purpose UI element. Cannot be broken down further. |
| **Atom**             | `TextInput.jsx`  | Same — a single, self-contained input control. |
| **Molecule**         | `ProfileCard.jsx`| Built by combining smaller pieces (image, heading, text, link) into one reusable unit. |
| **Organism / Page**  | `App.jsx`        | Combines the atoms and molecules together into the full page layout. |

## Reusability in action

- `Buttons` is used **4 times** in `App.jsx` (blue/red/green/orange theme
  switchers) — same component, different `color` and `active` props.
- `TextInput` is used **twice** — once tied to the live app theme, once
  with a fixed `color="green"` prop that ignores the theme entirely,
  proving the component isn't hardcoded to one look.
- `ProfileCard` is used **twice** — once for the main profile, once with
  a completely different name/role/image/theme, proving it's a generic,
  reusable card and not a one-off block of markup.

## Customization

Every component accepts props instead of hardcoded values:

```jsx
<Buttons text="BLUE" color="blue" size="medium" />
<Buttons text="RED"  color="red"  size="large"  />

<TextInput placeholder="Type..." size="small" color="green" />

<ProfileCard name="Jane Doe" role="Designer" image="..." theme="orange" />
```

Changing `color` or `size` never requires touching the component's
internal code — only the props passed to it.

## Tech stack

- React
- Vite
- Plain CSS with CSS custom properties (`--neon`, `--neon-soft`,
  `--neon-border`) for live theme switching

## Running locally

```bash
npm install
npm run dev
```
