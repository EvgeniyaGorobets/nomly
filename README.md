# NativeBase TypeScript Expo Template

NativeBase Typescript Expo app

## Dev

To nuke and reinstall everything:

```
npm cache clear --force
rm -rf package-lock.json node_modules/
npm install --registry=https://registry.npmjs.org/
```

`npx expo start` to run the app

## Build

- `eas login`
- `eas build -p android --profile {preview/production}`

## Notes

- HelperText doesn't work in tests unless its rendering is conditional. The visible prop gets changed but the opacity remains zero
- onFocus doesn't fire with RNTL onPress()
