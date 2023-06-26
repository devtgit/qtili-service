import React, { useEffect } from 'react'
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
  SelectArrayInput,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import { CreateToolbar } from '@/components/CreateToolbar'
import { BackButton } from '@/components/BackButton'

const validateUserCreation = (values: any) => {
  const errors: any = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  return errors
}

export const ResourceList = (props: ListProps) => {
  return (
    <List {...props}>
      <Datagrid>
        <EditButton />
        <TextField source="title" label="Title" />
        <ReferenceArrayField source="word_ids" label="Words" reference="kz_ru">
          <SingleFieldList>
            <ChipField source="wd" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Datagrid>
    </List>
  )
}

export const ResourceCreate = (props: CreateProps) => {
  useEffect(() => {
    document.querySelector('input')?.focus()
  }, [])

  return (
    <Create
      {...props}
      actions={
        <TopToolbar sx={{ justifyContent: 'flex-start' }}>
          <BackButton />
        </TopToolbar>
      }
    >
      <SimpleForm validate={validateUserCreation} toolbar={<CreateToolbar />}>
        <TextInput source="title" label="Title" required />
        <ReferenceArrayInput
          source="word_ids"
          reference="kz_ru"
          sort={{ field: 'wd', order: 'ASC' }}
        >
          <AutocompleteArrayInput
            optionText="wd"
            filterToQuery={(searchText) => ({ wd: `${searchText}` })}
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  )
}

export const ResourceEdit = (props: EditProps) => (
  <Edit
    {...props}
    actions={
      <TopToolbar sx={{ justifyContent: 'flex-start' }}>
        <BackButton />
      </TopToolbar>
    }
  >
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <ReferenceArrayInput
        source="word_ids"
        reference="kz_ru"
        sort={{ field: 'wd', order: 'ASC' }}
      >
        <AutocompleteArrayInput
          optionText="wd"
          filterToQuery={(searchText) => ({ wd: `${searchText}` })}
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)
