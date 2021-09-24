## Crypto Collectable Wallet

There are two pages. One is the list page and the other is the detail page.

Here I use the modal to show the detail page because when user navigates back
to list page, app doesn't need to send request  again and move to the position.

## Setup

```shell
yarn 
yarn start
```

## Project
```
src
├── components
│   └──Atom
│       └──Arrow
│       └── FallbackPage
│       └──Loading

├── module
│   └──PostsWall 
│       └── adapter
│       └── view 
│       └── usecase
│       └── index
├── App.tsx
├── index.tsx
```