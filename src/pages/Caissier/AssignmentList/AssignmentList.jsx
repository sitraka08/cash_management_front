import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import {
  add,
  remove,
  update,
  useAssignment,
} from "../../../services/assignment/useAssignment";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import Inputs from "../../../components/input/Inputs";
import { addOptions } from "../../../utils/Functions";
import { useProf } from "../../../services/prof/useProf";
import {
  mergeAssign,
  professorToSelect,
  trainingToSelect,
} from "../../../utils/refactor/merge";
import { useTraining } from "../../../services/training/useTraining";

// model Assignment {
//   id              Int       @id @default(autoincrement())
//   assignment_date DateTime
//   professor_id    Int
//   training_id     Int
//   // Relations
//   professor       Professor @relation(fields: [professor_id], references: [id])
//   training        Training  @relation(fields: [training_id], references: [id])
// }

const FORM = [
  {
    name: "professor_id",
    label: "Proffesseur",
    type: "select",
    placeholder: "Proffesseur",
    required: true,
    options: [],
  },
  {
    name: "training_id",
    label: "Formation",
    type: "select",
    placeholder: "Formation",
    required: true,
    options: [],
  },
  {
    name: "salary",
    label: "Salaire",
    type: "text",
    placeholder: "Salaire",
    required: true,
  },
  {
    name: "assignment_date",
    label: "Date",
    type: "date",
    placeholder: "Date",
    required: true,
  },
];

const tabHeader = [
  "Id professeur",
  "Nom professeur",
  "Salaire",
  "Formation",
  "Prix formation",
  "Date",
  "Action",
];
const tabField = [
  ["professor", "ref"],
  ["professor", "first_name"],
  "salary",
  ["training", "training_name"],
  ["training", "participation_fee"],
  "assignment_date",
  "action",
];
const key = "assignments";

const AssignmentList = () => {
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
    data: { profs },
  } = useProf();
  const {
    data: { trainings },
  } = useTraining();

  const {
    error: errorFetch,
    data: { assignments },
    isError,
    isFetching,
  } = useAssignment();

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
      Object.entries(mergeAssign(data)).forEach(([name, value]) => {
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

  const submit = (v) => {
    const data = {
      ...v,
      professor_id: v.professor_id.value,
      training_id: v.training_id.value,
    };
    mutate(data);
  };

  const OPTIONS_ASSIGN = [
    {
      name: "professor_id",
      options: professorToSelect(profs),
    },
    {
      name: "training_id",
      options: trainingToSelect(trainings),
    },
  ];

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
          {addOptions({
            originalArray: FORM,
            optionsArray: OPTIONS_ASSIGN,
          }).map((item, index) => (
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
          tabValue={assignments}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default AssignmentList;
