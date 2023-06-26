import "@/index.css";
import "@/fonts/Ubuntu/fonts.css";
import "@/fonts/Ubuntu_Mono/fonts.css";

import React from "react";
import { Admin, Resource } from "react-admin";
import { authProvider, dataProvider } from "./firebase/config";
import * as KzRuResource from "@/resources/kz_ru";
import * as DictKzRuResource from "@/resources/dict_kz_ru";
import * as LessonsResource from "@/resources/lessons";
import * as LessonsDraftResource from "@/resources/lessons_draft";
import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import theme from "./theme";

function App() {
  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="Admin"
    >
      {/*<Resource*/}
      {/*  name="kz_ru"*/}
      {/*  options={{*/}
      {/*    label: "Dictionary: KZ-RU",*/}
      {/*  }}*/}
      {/*  icon={TranslateIcon}*/}
      {/*  list={KzRuResource.ResourceList}*/}
      {/*  create={KzRuResource.ResourceCreate}*/}
      {/*  edit={KzRuResource.ResourceEdit}*/}
      {/*/>*/}
      <Resource
        name="dict_kz_ru"
        options={{
          label: "Dictionary: KZ-RU",
        }}
        icon={TranslateIcon}
        list={DictKzRuResource.ResourceList}
        create={DictKzRuResource.ResourceCreate}
        edit={DictKzRuResource.ResourceEdit}
      />
      {/*<Resource*/}
      {/*  name="lessons"*/}
      {/*  options={{*/}
      {/*    label: "Lessons",*/}
      {/*  }}*/}
      {/*  icon={SchoolIcon}*/}
      {/*  list={LessonsResource.ResourceList}*/}
      {/*  create={LessonsResource.ResourceCreate}*/}
      {/*  edit={LessonsResource.ResourceEdit}*/}
      {/*/>*/}
      <Resource
        name="lessons_draft"
        options={{
          label: "Lessons",
        }}
        icon={SchoolIcon}
        list={LessonsDraftResource.ResourceList}
        create={LessonsDraftResource.ResourceCreate}
        edit={LessonsDraftResource.ResourceEdit}
      />
    </Admin>
  );
}

export default App;
