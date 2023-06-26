# QTili

```bash
git pull https://github.com/devtgit/qtili-service.git
```

## Install

1. Install pnpm - https://pnpm.io/installation

## Dev

### Web

```bash
cd packages/qtili-web
cp .env.template .env # only first time, fill created file with relevant variables
pnpm install # only first time or after dependencies updates
pnpm dev
```

### Admin

```bash
cd packages/qtili-admin
cp .env.template .env # only first time, fill created file with relevant variables
pnpm install # only first time or after dependencies updates
pnpm dev
```

### Emulators (local development, backend)

> In case you want to run local firebase emulators instead of connecting to cloud firebase project.

Install Firebase CLI - https://firebase.google.com/docs/cli#install-cli-mac-linux

```bash
pnpm emulators
```

## Firebase Cheatsheet

* `firebase install` - setup firebase-tools
* `firebase login` - login into firebase account
* `firebase deploy` - to deploy built project
* `firebase deploy --only firestore:rules`
* `firebase deploy --only hosting`
* `firebase serve --only hosting:qtili-admin` - deploy certain app
* `firebase target:apply hosting  qtili-admin  admin-qtili-dev2` - assign hosting target to app
* `firebase functions:config:set service.value="value"`
* `firebase functions:config:get > .runtimeconfig.json` - to copy remote config to local for emulate functions locally
* `firebase emulators:start --import "./tmp-imported-firestore-data" --export-on-exit --only "functions,firestore,auth,database,storage"`
* `firebase use --add` - add project
* `firebase use project_name` - add project
* `firebase deploy -P project_name` - deploy project
* `firebase hosting:channel:deploy preview_channel_name` - deploy preview channel
* `firebase functions:log` - functions log


## How to set up storage cors (gcloud)

```bash
gcloud auth login # auth
gcloud storage buckets describe gs://qtili-dev2.appspot.com --format="default(cors)" # get cors config
gcloud storage buckets update gs://qtili-dev2.appspot.com --cors-file=cors.json # set cors config
```

cors.json example:
```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```
