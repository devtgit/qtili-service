# QTili

## Commands

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


## Storage cors (gcloud)

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
