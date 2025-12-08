# EatProtien Admin Dashboard (frontend)

Developer notes:

- The sidebar items are data-driven by `src/data/navItems.ts`. Edit/add nav items there (use `icon` values from `react-icons/fi`, e.g. `FiHome`, `FiUsers`, etc.).
- Plug real APIs into RTK slices in `src/store/slices/*`. Example: replace the `fetchProducts` mock promise with a `fetch('/api/products')` call.
- Theme colors are extended in `tailwind.config.js` under `colors.brand` (primary green) and `danger` (red accents).

## Quick start

1. Install

```bash
npm install
```
