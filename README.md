# Walkthrough for Restcountries API project

## Setup Typescript

Install `tsc` via `npm install -g typescript`.

Create `tsconfig.json` configuration file at project root directory
```
# ./tsconfig.json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "sourceMap": true
    }
}
```

In you are on VS Code, press `Ctrl+Shift+B` and choose `watch` option so that file changes will automatically transpile `.tsx` or `.ts` files into `.js` files.
