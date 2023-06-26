import React, { useEffect } from "react";
import {
  Create,
  CreateProps,
  Datagrid,
  Edit,
  EditButton,
  EditProps,
  List,
  ListButton,
  ListProps,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { CreateToolbar } from "@/components/CreateToolbar";
import { BackButton } from "@/components/BackButton";

const validateUserCreation = (values: any) => {
  const errors: any = {};
  if (!values.wd) {
    errors.wd = "Required";
  }
  if (!values.tr) {
    errors.tr = "Required";
  }
  return errors;
};

export const ResourceList = (props: ListProps) => {
  return (
    <List {...props}>
      <Datagrid>
        <EditButton />
        <TextField source="wd" label="Word" />
        <TextField source="tr" label="Translation" />
      </Datagrid>
    </List>
  );
};

export const ResourceCreate = (props: CreateProps) => {
  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);

  return (
    <Create
      {...props}
      actions={
        <TopToolbar sx={{ justifyContent: "flex-start" }}>
          <BackButton />
        </TopToolbar>
      }
    >
      <SimpleForm validate={validateUserCreation} toolbar={<CreateToolbar />}>
        <TextInput source="wd" label="Word" required />
        <TextInput source="tr" label="Translation" required />
      </SimpleForm>
    </Create>
  );
};

export const ResourceEdit = (props: EditProps) => (
  <Edit
    {...props}
    actions={
      <TopToolbar sx={{ justifyContent: "flex-start" }}>
        <BackButton />
      </TopToolbar>
    }
  >
    <SimpleForm>
      <TextInput source="wd" label="Word" />
      <TextInput source="tr" label="Translation" />
    </SimpleForm>
  </Edit>
);
