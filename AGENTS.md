# AGENTS.md - Mortgage Calculator Colombia

## Project Overview
Static mortgage amortization calculator for Colombia using HTML5, CSS3, and Vanilla JavaScript. Features multi-currency support (10+ Latin American currencies), extra contributions, rate changes, and Chart.js visualizations.

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- Chart.js (via CDN) for charts
- No build system required
- No package.json (static site)

## Commands

### Run Locally
```bash
# Open index.html directly in browser
open index.html

# Or serve with http-server
npx http-server
```

### Testing/Linting
- No tests configured
- No linting configured
- Manual browser testing required

## Code Style Guidelines

### JavaScript Conventions
- **Naming:** camelCase for functions/variables, PascalCase for constructors
- **Constants:** UPPER_SNAKE_CASE for configuration objects (e.g., `currencies`)
- **Comments:** Section headers with `//` format (see `app.js` lines 1-2)
- **Variables:** `const` by default, `let` when reassignment needed, avoid `var`
- **Strings:** Template literals for dynamic content
- **Globals:** Declare at top of `app.js` (lines 15-20 pattern)

### CSS Conventions
- **Custom Properties:** All values in `:root` (colors, spacing, fonts, animations)
- **Naming:** BEM-style (`card__header`, `btn--primary`, `form-control--compact`)
- **Responsive:** Mobile-first, breakpoints at 768px, 1024px
- **Dark Mode:** `[data-theme="dark"]` and `prefers-color-scheme` media query
- **Accessibility:** `:focus-visible`, `prefers-reduced-motion`, `prefers-contrast: high`

### HTML Conventions
- Semantic elements (`header`, `footer`, `main`, `details`)
- `data-translate` attributes for i18n
- External scripts loaded before `</body>`

### Error Handling
- Validate DOM element existence before use
- Wrap calculations in try/catch blocks
- Show user feedback via `showErrorNotification()` / `showSuccessNotification()`
- Currency formatting: always handle parse failures gracefully

### Functions
- Single responsibility principle
- Helper functions before main functions
- Early returns for validation checks
- Consistent parameter order: `function name(param1, param2, options)`

### Translations (translations.js)
- Flat key structure per language (e.g., `t('title')`, `t('currency')`)
- Nested objects for currency names (`t('currencies.COP')`)
- Fallback to key if translation missing (line 610-614 pattern)
