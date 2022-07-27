# Rust/WASM Game of Life

## install dependencies
```yarn```

## start development
```yarn run dev```

## run tests (not working yet)
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

