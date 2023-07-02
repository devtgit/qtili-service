import React, { useEffect } from "react";
import {
  ArrayField,
  AutocompleteArrayInput,
  ChipField,
  Create,
  CreateProps,
  Datagrid,
  Edit,
  EditButton,
  EditProps,
  List,
  ListButton,
  ListProps,
  ReferenceArrayField,
  ReferenceArrayInput,
  SaveButton,
  DeleteButton,
  SelectArrayInput,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  Button,
  useGetRecordId,
} from "react-admin";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { CreateToolbar } from "@/components/CreateToolbar";
import { BackButton } from "@/components/BackButton";
import axios from "axios";

const validateUserCreation = (values: any) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = "Required";
  }
  return errors;
};

export const ResourceList = (props: ListProps) => {
  return (
    <List {...props}>
      <Datagrid
        rowStyle={(_, index) => ({
          verticalAlign: "top",
        })}
      >
        <EditButton />
        <TextField source="title" label="Title" />
        <TextField
          sx={{ wordBreak: "break-word" }}
          source="words"
          label="Words"
        />
        <TextField
          sx={{ whiteSpace: "pre" }}
          source="phrases"
          label="Phrases"
        />
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
        <TextInput source="title" label="Title" required fullWidth />
        <TextInput source="words" label="Words" multiline required fullWidth />
        <TextInput
          source="phrases"
          label="Phrases"
          multiline
          required
          fullWidth
        />
      </SimpleForm>
    </Create>
  );
};

export const ResourceEdit = (props: EditProps) => {
  const lessonId = useGetRecordId();

  return (
    <Edit
      {...props}
      actions={
        <TopToolbar sx={{ justifyContent: "flex-start" }}>
          <BackButton />
        </TopToolbar>
      }
    >
      <SimpleForm
        toolbar={
          <Toolbar sx={{ gap: 0.5 }}>
            <SaveButton label="Save" type="button" variant="text" />
            <DeleteButton />
            <Button
              label="Generate"
              onClick={async () => {
                const res = await axios.post(
                  import.meta.env.VITE_FUNCTIONS_ENDPOINT + "/generate",
                  {
                    lessonId,
                  }
                );

                console.log(res);
              }}
            />
          </Toolbar>
        }
      >
        <TextInput source="title" label="Title" />
        <TextInput source="words" label="Words" multiline required fullWidth />
        <TextInput
          source="phrases"
          label="Phrases"
          multiline
          required
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
};
