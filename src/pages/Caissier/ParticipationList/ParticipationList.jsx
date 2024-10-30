import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import {
  add,
  remove,
  update,
  useParticipation,
} from "../../../services/participation/useParticipation";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import Inputs from "../../../components/input/Inputs";
import { addOptions } from "../../../utils/Functions";
import { useProf } from "../../../services/prof/useProf";
import {
  mergeParticipation,
  professorToSelect,
  studentToSelect,
  trainingToSelect,
} from "../../../utils/refactor/merge";
import { useTraining } from "../../../services/training/useTraining";
import { useStudent } from "../../../services/student/useStudent";

// model Participation {
//   id                 Int      @id @default(autoincrement())
//   participation_date DateTime
//   student_id         Int
//   training_id        Int
//   // Relations
//   student            Student  @relation(fields: [student_id], references: [id])
//   training           Training @relation(fields: [training_id], references: [id])
// }

const FORM = [
  {
    name: "student_id",
    label: "Etudiant",
    type: "select",
    placeholder: "Etudiant",
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
    name: "participation_date",
    label: "Date",
    type: "date",
    placeholder: "Date",
    required: true,
  },
];

const tabHeader = [
  "Matricule etudiant",
  "Nom etudiant",
  "Formation",
  "Prix de participation",
  "Date de participation",
  "Action",
];
const tabField = [
  ["student", "registration"],
  ["student", "first_name"],
  ["training", "training_name"],
  ["training", "participation_fee"],
  "participation_date",
  "action",
];
const key = "participations";

const ParticipationList = () => {
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
    data: { students },
  } = useStudent();
  const {
    data: { trainings },
  } = useTraining();

  const {
    error: errorFetch,
    data: { participations },
    isError,
    isFetching,
  } = useParticipation();

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
      Object.entries(mergeParticipation(data)).forEach(([name, value]) => {
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
      student_id: v.student_id.value,
      training_id: v.training_id.value,
    };
    mutate(data);
  };

  const OPTIONS = [
    {
      name: "student_id",
      options: studentToSelect(students),
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
        <div className="w-full  grid grid-cols-3 my-4 gap-5">
          {addOptions({
            originalArray: FORM,
            optionsArray: OPTIONS,
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
          tabValue={participations}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default ParticipationList;
