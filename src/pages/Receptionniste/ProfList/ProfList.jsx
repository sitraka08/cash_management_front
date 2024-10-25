import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import { add, remove, update } from "../../../services/prof/useProf";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import { addOptions } from "../../../utils/Functions";
import Inputs from "../../../components/input/Inputs";
import { useProf } from "../../../services/prof/useProf";

const FORM = [
  {
    name: "last_name",
    label: "Nom",
    type: "text",
    placeholder: "Nom",
    required: true,
  },
  {
    name: "first_name",
    label: "Prénom(s)",
    type: "text",
    placeholder: "Prénom(s)",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "address",
    label: "Adresse",
    type: "text",
    placeholder: "Adresse",
    required: true,
  },
];

const tabHeader = ["Id", "Nom", "Prénom", "Adresse", "Email", "Action"];
const tabField = [
  "ref",
  "last_name",
  "first_name",
  "address",
  "email",
  "action",
];
const key = "profs";

const ProfList = () => {
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
    data: { profs },
    isError,
    isFetching,
  } = useProf();

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
      Loading.standard();
    },
    onSuccess: (data) => {
      Loading.remove();
      queryClient.invalidateQueries(key);
      Notiflix.Notify.info("Succès", "Fermer");
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
          tabValue={profs}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default ProfList;
