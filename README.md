# Rust/WASM Game of Life

This repo is a result of following the rust-wasm tutorial [here](https://rustwasm.github.io/book/game-of-life/introduction.html), then converting it to TypeScript and reorganizing the project into a structure that makes better sense for my preferences, so that I have a stable jumping off point for future projects serving WASM compiled from Rust.

## install dependencies
```yarn```

## start development
```yarn run dev```

## run tests
```wasm-pack test --headless [--firefox | --chrome | --safari]```

## visit http://localhost:8080

After installation, start developing here:
- `./rust_src`: Rust source files
- `./js`: TypeScript source files

## Build / Deploy

```bash
# build the library to ./dist, including .wasm
yarn build
```

## Structure

- `./rust_src`: Rust library
- `./pkg`: `wasm-pack` compiled rust
- `./js`: TypeScript source code, webpack entrypoint
- `./tests`: To test your library

