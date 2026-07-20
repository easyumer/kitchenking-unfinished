# Server

Nuxt's server layer lives here, separate from the `app/` frontend. This folder isn't used yet — it's the intended home for backend work such as:

- `server/api/contact.post.ts` — handle the contact form once it exists
- `server/api/reservations.post.ts` — reservation submissions
- `server/api/order.post.ts` — online ordering, if not delegated to a third-party provider

Any file under `server/api/` is automatically exposed as `/api/<name>`. See the [Nuxt server docs](https://nuxt.com/docs/guide/directory-structure/server) and the root `README.md` for the full list of integration points this project still needs.
