# sapper-miniblog

A minimalistic blog built on Sapper.

### Install

Clone the repo

```
git clone git@github.com:sebastianconcept/sapper-miniblog.git
cd sapper-miniblog
npm install # or yarn!
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help on working with the code.

## Spirit

The Sapper miniblog is a bare-bones blog so you can have the foundation to use it as your own customizable blog using Sapper conventions and Svelte.

If you feel it has almost nothing, that's intentional. We want to make room for the community to expand it in ways we can't predict now.

Fork and be creative with it!

## Features

- Responsive
- Draft and Published articles only
- Edit articles in markdown
- One author
- SSR - Supports Server Side Rendering
- Easy export of content in JSON format

## Architecture

This blog is build using Sapper, which is for Svelte what NextJs is for React.

- Routed components are in `/src/routes/`
- Components used by those routed ones are in `/src/components/`
- Server endpoints are in `/src/api/`

## Bugs and feedback

This blog is in early development, and may have the odd rough edge here and there. Please be vocal over on the [issue tracker](https://github.com/sebastianconcept/sapper-miniblog/issues).
