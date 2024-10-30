import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import {
  add,
  remove,
  update,
  useTraining,
} from "../../../services/training/useTraining";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import Inputs from "../../../components/input/Inputs";
import * as yup from "yup";

const FORM = [
  {
    name: "training_name",
    label: "Nom de la formation",
    type: "text",
    placeholder: "Ex: Formation en informatique",
    required: true,
  },
  {
    name: "participation_fee",
    label: "Frais de participation",
    type: "text",
    placeholder: "Ex: 1000",
    required: true,
  },
  {
    name: "duration",
    label: "Durée(en mois)",
    type: "text",
    placeholder: "Ex: 3",
    required: true,
  },
];

const tabHeader = [
  "Nom de la formation",
  "Frais de participation",
  "Durée",
  "Action",
];
const tabField = ["training_name", "participation_fee", "duration", "action"];
const key = "trainings";

const TrainingList = () => {
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
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        training_name: yup
          .string()
          .required("Nom de la formation est obligatoire"),
        participation_fee: yup
          .string("Frais de participation est obligatoire")
          .test(
            "is-number",
            "Frais de participation doit être un nombre",
            (value) => !isNaN(value)
          )
          .required("Frais de participation est obligatoire"),
        duration: yup
          .string("")
          .test(
            "is-number",
            "Durée doit être un nombre",
            (value) => !isNaN(value)
          )
          .required("Durée est obligatoire"),
      })
    ),
  });

  const {
    error: errorFetch,
    data: { trainings },
    isError,
    isFetching,
  } = useTraining();

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
        <div className="w-full  grid grid-cols-3 my-4 gap-5">
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
          tabValue={trainings}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default TrainingList;
