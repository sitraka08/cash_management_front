import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import { addOptions } from "../../../utils/Functions";
import Inputs from "../../../components/input/Inputs";
import {
  add,
  remove,
  update,
  useClient,
} from "../../../services/client/useClient";
// model Client {
//   id         Int      @id @default(autoincrement())
//   ref        String
//   first_name String
//   last_name  String
//   address    String
//   email      String
//   // Relations
//   sales      Sale[]
//   rentals    Rental[]
// }

export const FORM = [
  {
    name: "first_name",
    label: "Nom",
    type: "text",
    placeholder: "Nom",
    required: true,
  },
  {
    name: "last_name",
    label: "Prénom(s)",
    type: "text",
    placeholder: "Prénom(s)",
    required: true,
  },

  {
    name: "address",
    label: "Adresse",
    type: "text",
    placeholder: "Adresse",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
];

const tabHeader = ["Id", "Nom", "Prénom(s)", "Adresse", "Email", "Action"];
const tabField = [
  "ref",
  "last_name",
  "first_name",
  "address",
  "email",
  "action",
];
const key = "clients";

const ClientList = () => {
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const {
    error: errorFetch,
    data: { clients },
    isError,
    isFetching,
  } = useClient();

  const { mutate } = useMutation({
    mutationFn: getValues("id") ? update : add,
    mutationKey: key,
    onMutate: (form) => {
      Loading.standard();
    },
    onSuccess: (data) => {
      Loading.remove();
      Notiflix.Notify.info("Succès", "Fermer");
      queryClient.invalidateQueries(key);
      reset();
    },
    onError: (error) => {
      Loading.remove();
      Notiflix.Notify.failure("Echec de l'ajout", "Fermer");
    },
  });
  const { mutate: deleteFn } = useMutation({
    mutationFn: remove,
    mutationKey: key,
    onMutate: (form) => {
      Notiflix.Notify.info("Succès", "Fermer");
      Loading.standard();
    },
    onSuccess: (data) => {
      Loading.remove();
      queryClient.invalidateQueries(key);
      reset();
    },
    onError: (error) => {
      Loading.remove();
      Notiflix.Notify.failure("Echec ", "Fermer");
    },
  });

  const action = (rowData) => {
    const editAction = (data) => {
      Object.entries(data).forEach(([name, value]) => {
        setValue(name, value);
      });
    };
    return (
      <IconCrud
        deleteAction={() => deleteFn(rowData.id)}
        editAction={editAction}
        onDelete={() => console.log("delete")}
        listAction={["edit", "delete"]}
        rowData={rowData}
      />
    );
  };

  const submit = (value) => {
    mutate(value);
  };

  return (
    <>
      <Search
        onSubmit={handleSubmit(submit)}
        isEdited={watch("id")}
        onReset={() => {
          reset();
        }}
      >
        <div className="w-full  grid grid-cols-4 my-4 gap-5">
          {FORM.map((item, index) => (
            <Inputs
              key={index}
              control={control}
              register={register(item.name)}
              {...item}
              error={errors[item.name]?.message}
            />
          ))}
        </div>
      </Search>

      <div className="w-full">
        <Datatables
          tabHeader={tabHeader}
          tabField={tabField}
          isFetching={isFetching}
          tabValue={clients}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default ClientList;
