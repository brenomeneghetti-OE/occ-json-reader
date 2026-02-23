# Copilot Instructions for Front-End Project

This project is a modern front-end application built with React, TypeScript, Tailwind CSS, Biome.js, and Vite. The goal of these instructions is to help Copilot generate code, suggestions, and follow conventions that align with best practices and a senior front-end engineer's mindset. Keep it simple, avoid unnecessary dependencies, and favor readability, maintainability, and performance.

## General Principles

- **Simplicity first**: prefer built-in APIs and features over external libraries unless absolutely justified.
- **Type safety**: leverage TypeScript aggressively; avoid `any` and prefer strict typings.
- **Modularity**: components should be small, reusable, and focused. Use hooks for logic extraction.
- **Accessibility**: always think about ARIA attributes, keyboard navigation, and semantic HTML.
- **Performance**: lazy-load routes/components, memoize where appropriate, and avoid unnecessary re-renders.
- **States and effects**: use React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) correctly; clean up effects.
- **Styling**: use Tailwind CSS utility classes; keep styles in JSX; avoid CSS-in-JS for simplicity.
- **Formatting & linting**: follow Biome.js configuration for formatting, lint rules, and code quality. Keep config minimal.

## Project Structure

```
/src
  /components       # reusable UI components
  /hooks            # custom hooks
  /pages            # route-based components
  /styles           # Tailwind config and global styles
  /utils            # helper functions
  App.tsx
  main.tsx          # entry point
/tsconfig.json
/vite.config.ts
/biome.config.ts
/tailwind.config.ts
```

- Keep folders shallow. Organize by feature when it makes sense.
- Name files with lowercase kebab-case for simplicity (`my-component.tsx`).
- Use `index.ts` for barrel exports when it reduces import paths but avoid deep re-export chains.

## React & TypeScript Guidelines

- Always annotate component props and return types.
- Use `FC` or explicit function types as preferred by team; ensure callbacks and event handlers are typed.
- Avoid default exports; prefer named exports for easier refactoring.
- For state management within a page, use `useState` or `useReducer`. For cross-component state, context can be added but maintain simplicity.
- When typing external data (API responses, props), create interfaces/types in `types.ts` or close to usage.

## Tailwind CSS Guidelines

- Use utility-first classes directly in JSX.
- Customize theme in `tailwind.config.ts` as needed (colors, spacing) but keep it minimal.
- Avoid `!important` and deep nesting; prefer composition of utility classes.
- Use `@apply` sparingly in `global.css` for shared patterns.

## Biome.js

- Configure Biome to run both linting and formatting in pre-commit hooks or CI.
- Follow Biome rules for import ordering, spacing, and TypeScript conventions.
- Use `// biome-ignore` comments only when necessary with explanation.

## Vite

- Utilize Vite dev server for fast iteration; configure aliases (`@/components`) in `vite.config.ts`.
- Keep build output clean and optimize assets with Vite plugins if required.

## Code Quality & Reviews

- Write clear commit messages; prefix with type (feat, fix, chore, etc.).
- Add comments for non-obvious logic but aim to make code self-explanatory.


## Examples

- **Component**:
  ```tsx
  import React from 'react';

  type ButtonProps = {
    label: string;
    onClick: () => void;
  };

  export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
    <button
      type="button"
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
  ```

- **Hook**:
  ```ts
  import { useState, useEffect } from 'react';

  export function useFetch<T>(url: string): { data: T | null; error: Error | null; loading: boolean } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
  }
  ```

> Use this `copilot-instructions` file to guide the AI when generating new code or suggestions. Keep it updated as the project evolves.
