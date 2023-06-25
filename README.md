# QTili

## Commands

* `firebase install` - setup firebase-tools
* `firebase login` - login into firebase account
* `firebase deploy` - to deploy built project
* `firebase deploy --only firestore:rules`
* `firebase deploy --only hosting`
* `firebase functions:config:set service.value="value"`
* `firebase functions:config:get > .runtimeconfig.json` - to copy remote config to local for emulate functions locally
* `firebase emulators:start --import "./tmp-imported-firestore-data" --export-on-exit --only "functions,firestore,auth,database,storage"`
* `firebase use --add` - add project
* `firebase use project_name` - add project
* `firebase deploy -P project_name` - deploy project
* `firebase hosting:channel:deploy preview_channel_name` - deploy preview channel
* `firebase functions:log` - functions log
