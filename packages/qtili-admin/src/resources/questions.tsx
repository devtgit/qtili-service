import React from "react";
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  SimpleForm,
  TextField,
  TextInput,
  ShowProps,
  ListProps,
  CreateProps,
  EditProps,
  Resource,
  useShowContext,
} from "react-admin";
import QuestionComponent from "../components/QuestionComponent";

const ShowComponent = () => {
  const showValue = useShowContext();
  const { isLoading, error } = showValue;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  const { text, answer } = showValue.record;

  return <QuestionComponent text={text} answer={answer} />;
};

export const QuestionShow = (props: ShowProps) => {
  return (
    <Show {...props} component="div">
      <ShowComponent />
    </Show>
  );
};

export const QuestionList = (props: ListProps) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="text" />
        <pre>
          <TextField source="answer" />
        </pre>
      </Datagrid>
    </List>
  );
};

export const QuestionCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="text" multiline />
        <TextInput source="answer" multiline rows={4} />
      </SimpleForm>
    </Create>
  );
};

export const QuestionEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="text" multiline />
      <TextInput source="answer" multiline rows={4} />
    </SimpleForm>
  </Edit>
);

export const renderQuestionResource = () => (
  <Resource
    name="questions"
    show={QuestionShow}
    list={QuestionList}
    create={QuestionCreate}
    edit={QuestionEdit}
  />
);

export default renderQuestionResource;
