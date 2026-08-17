# Mailyon — Email Template Builder

Headerless drag & drop email template builder (React + TypeScript). Canvas with 8+ components, inspector, MJML/HTML/JSON export. Also published as the `mailyon` npm package.

## Project

- Stack: React 18, TypeScript (strict), Tailwind CSS, zustand (state), react-dnd (drag & drop), mjml-browser, CRA (react-scripts 5).
- Entry points: `src/index.tsx` (dev app) · `src/components/EmailTemplateBuilder.tsx` (main library component) · `src/index.package.ts` (npm package exports).
- Template model: `EmailTemplate` → `components: EmailComponent[]` (nested, `columns`/`column` children). All types in `src/types/index.ts`.
- Deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

## Commands

- `npm start` — dev server (CRA)
- `npm run build` — production build → `build/` (verified working)
- `npm run build:package` — library build via `tsconfig.package.json` → `dist/` (types + commonjs)
- `npm run build:docs` — build, then move `build/` → `docs/` (Pages artifact)
- `npm test` — react-scripts test (Jest). No tests exist yet; use `CI=true npm test` non-interactively
- `npm run deploy` — gh-pages deploy (runs `predeploy` build first)

## Architecture

- `src/store/builderStore.ts` — single source of truth (zustand): template, selection, hover, undo/redo history, all component CRUD + `createComponent` helper.
- `src/components/Builder/` — the canvas: `Builder.tsx` (tabs: editor/pc/mobile), `DropZone.tsx`, `DraggableComponent.tsx`, `ComponentRenderer.tsx`, `Preview.tsx`.
- `src/components/ComponentLibrary/` — left palette of draggable component types.
- `src/components/Inspector/` — right panel: per-component props, template settings, code/export tabs.
- `src/components/Toolbar/Toolbar.tsx` — top bar: undo/redo, save/load, view toggles.
- `src/hooks/` — package-facing wrappers over the store: `useEmailTemplateBuilder`, `useEmailExport`, `useEmailTemplateManager`.
- `src/utils/mjmlExport.ts` — `generateMJML(template)` + `convertMJMLToHTML` (mjml-browser); must stay in sync with preview rendering.
- `src/utils/componentUtils.ts` — `getDefaultProps(type)` per component type.

## Conventions

- Component types are lowercase strings (`'header' | 'text' | 'image' | 'button' | 'divider' | 'socialMedia' | 'footer' | 'spacer' | 'columns' | 'column'`); add new types to `ComponentType` in `src/types/index.ts`.
- Components are `export const X: React.FC = () => ...` named exports. Quoting is inconsistent (double quotes in most components, single in store/hooks/utils) — match the surrounding file.
- Every mutating store action deep-clones the template first (`cloneTemplate`), then pushes the new snapshot onto `history` (capped at 100) and sets `metadata.updatedAt`. Never mutate the current template or history snapshots in place.
- Selection is stored as `selectedComponentId` (id), not an object reference; resolve it with the `selectSelectedComponent` selector so it survives undo/redo and template replacement.
- Per-component props use `xxxVisible` boolean flags and camelCase sizing (`200px` strings); default props live in `componentUtils.ts`.
- New public API must be exported from `src/index.package.ts` (package build) — `src/index.tsx` is only the dev shell.
- `mjml-browser` has no types; ambient module declared in `src/types/mjml-browser.d.ts` (keep if API changes).
- Strict TS (`noEmit` for app, declarations emitted for package). `dist/` is committed.

## Notes

<!-- Quick add notes here: e.g. recent feature decisions, known issues, next steps -->
