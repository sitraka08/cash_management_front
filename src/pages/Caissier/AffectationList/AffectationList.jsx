import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FORM, SCHEMA } from "./const";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import { add, remove, update, useUsers } from "../../../services/user/useUser";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import { addOptions } from "../../../utils/Functions";
import Inputs from "../../../components/input/Inputs";

const tabHeader = [
  "Id prof",
  "Id formation",
  "Salaires",
  "Date d'affectation",
  "Action",
];
const tabField = [
  "id_prof",
  "id_formation",
  "salaires",
  "date_affectation",
  "action",
];
const key = "affectations";

const AffectationList = () => {
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SCHEMA),
  });

  const {
    error: errorFetch,
    data: { personnels },
    isError,
    isFetching,
  } = useUsers();

  const { mutate } = useMutation({
    mutationFn: getValues("id") ? update : add,
    mutationKey: key,
    onMutate: (form) => {
      Loading.standard();
    },
    onSuccess: (data) => {
      Loading.remove();
      setOpen(false);
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
      reset();
    },
    onError: (error) => {
      Loading.remove();
      Notiflix.Notify.failure("Echec ", "Fermer");
    },
  });

  const action = (rowData) => {
    const editAction = (data) => {
      Object.entries(mergeUser(data)).forEach(([name, value]) => {
        setValue(name, value);
      });
    };
    return (
      <IconCrud
        deleteAction={() => deleteFn(rowData.id)}
        editAction={editAction}
        onDelete={() => console.log("delete")}
        listAction={["edit", "delete", "details"]}
        rowData={rowData}
      />
    );
  };

  const newOptions = [];

  const submit = (value) => {
    const data = {
      ...value,
      poste_id: value.poste_id?.id,
      region_id: value.region_id?.id,
    };

    mutate(data);
    Notiflix.Notify.info("Succès", "Fermer");
  };

  return (
    <>
      <Search onSubmit={handleSubmit(submit)}>
        <div className="w-full  grid grid-cols-4 my-4 gap-5">
          {addOptions({
            originalArray: FORM,
            optionsArray: newOptions,
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
          tabValue={personnels?.data}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default AffectationList;
