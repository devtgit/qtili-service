import React from "react";
import { SaveButton, Toolbar, useNotify, useRedirect } from "react-admin";
import { useFormContext } from "react-hook-form";

export const CreateToolbar = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { reset } = useFormContext();

  return (
    <Toolbar sx={{ gap: 0.5 }}>
      {/*<SaveButton*/}
      {/*  label="Save and Add New"*/}
      {/*  mutationOptions={{*/}
      {/*    onSuccess: (data) => {*/}
      {/*      notify('ra.notification.created', {*/}
      {/*        type: 'info',*/}
      {/*        messageArgs: { smart_count: 1 },*/}
      {/*      })*/}
      {/*      redirect(false)*/}
      {/*      reset()*/}

      {/*      document.querySelector('input')?.focus()*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  type="button"*/}
      {/*  variant="text"*/}
      {/*/>*/}
      <SaveButton label="Save" type="button" variant="text" />
    </Toolbar>
  );
};
