export default (identifier: string, displayName: string, coreVersion: string) => `{
  "name": "${identifier}",
  "displayName": "${displayName}",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "categories": [
    "Other"
  ],
  "main": "./dist/extension.cjs",
  "engines": {
    "vscode": "^1.89.0"
  },
  "activationEvents": [
    "onStartupFinished"
  ],
  "contributes": {
    "commands": [
      {
        "command": "${identifier}.helloWorld",
        "title": "Hello World"
      }
    ],
    "configuration": {
      "title": "${displayName}",
      "properties": {
        "${identifier}.message": {
          "type": "string",
          "default": "Hello World",
          "description": "The message to show in the notification"
        }
      }
    }
  },
  "scripts": {
    "build": "tsup --env.NODE_ENV production",
    "dev": "tsup --watch ./src",
    "typecheck": "tsc --noEmit",
    "vscode:prepublish": "pnpm run build"
  },
  "devDependencies": {
    "@types/node": "18.x",
    "@types/vscode": "^1.89.0",
    "reactive-vscode": "${coreVersion}",
    "tsup": "^8.0.2",
    "typescript": "^5.4.5"
  }
}
`
