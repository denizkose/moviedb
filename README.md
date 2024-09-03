# MovieDB (WIP 🚧)

**MovieDB** - wrapper for TMDB API.

## Goal of this project

- **For me:** Learn and improve skills
- **For user:** Have another variant of TMDB

## What working now

- Movie & TV Show pages
- Showing categories in main page
- Register and login (local db implementaion). It gives you nothing, just register and just login.

## TODO

- [x] Main page
- [x] Movie & TV Show pages
- [ ] Search with filters (in progress now)
- [ ] Authorization (through TMDB API)
- [ ] Improve security
- [ ] Refactor code
- [ ] Unit tests

### ADDITION FEATURES (POSSIBLY WILL BE CANCELED)

- [ ] Extend custom User model
- [ ] Create Admin dashboard

## Development

1. Install dependencies

```
pnpm i
```

2. Get TMDB API key and write it in `.env.local`:

```
NEXT_PUBLIC_TMDB_AUTHORIZATION='YOUR_KEY'
```

3. For register/login get mariadb link and create by yourself key for Auth.js and write it in `.env.local`:

```
MONGODB_URI='YOUR_LINK'
AUTH_SECRET='YOUR_CODE'
```

3. Run dev

```
pnpm dev
```
