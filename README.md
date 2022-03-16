# next-ssg-blog


## Directory structure

- `src/`: blog articles
  - `default/`: English articles
  - `ja/`: Japanese articles
- `public/`: resource files
  - `images/`: images used in blog articles

## Production build

```sh
$ npm ci --no-optional
$ npm run download
$ npm run build
$ npm run export
$ npx http-server out
```

## Debug build

```sh
$ npm i
$ npm run dev
```
