# TeaHouse Storefront

React storefront for a Medusa-powered tea shop. It includes a homepage, product catalog, product details, cart, customer auth screens, an account page, sale products, search, and a contacts page.

## Tech Stack

- React 19
- Vite
- React Router
- Bootstrap / React Bootstrap
- Sass modules
- Medusa Store API

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill `.env` with values from your Medusa backend:

```bash
VITE_MEDUSA_API_URL=http://localhost:9000
VITE_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here
VITE_MEDUSA_COUNTRY_CODE=ru
VITE_MEDUSA_REGION_ID=reg_your_region_id_here
VITE_MEDUSA_BESTSELLERS_COLLECTION_ID=pcol_your_bestsellers_collection_id_here
VITE_MEDUSA_SALES_COLLECTION_ID=pcol_your_sales_collection_id_here
```

Start the development server:

```bash
npm run dev
```

By default, Vite serves the app at:

```text
http://localhost:8000
```

## Backend Requirements

This project expects a running Medusa backend and configured Store API access. The catalog, cart, collections, regions, and customer auth all depend on backend data.

You need:

- A Medusa backend available at `VITE_MEDUSA_API_URL`
- A publishable API key
- A region id
- Product collections for bestsellers and sale products
- Products with variants and calculated prices

## Security Notes

This is a demo storefront, not a production authentication reference. Customer auth tokens are currently stored in `localStorage`. For production applications, prefer a backend-controlled auth flow with secure httpOnly cookies and a stricter XSS posture.

The publishable Medusa key is intended for frontend use, but project-specific values should still live in `.env`, not in committed source files.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## License

MIT
