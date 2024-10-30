import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import { add, remove, update, useSale } from "../../../services/sale/useSale";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import Inputs from "../../../components/input/Inputs";
import * as yup from "yup";
import { useEquipment } from "../../../services/equipment/useEquipment";
import {
  clientToSelect,
  equipmentToSelect,
  mergeSale,
  trainingToSelect,
} from "../../../utils/refactor/merge";
import { useClient } from "../../../services/client/useClient";
import { addOptions } from "../../../utils/Functions";

const FORM = [
  {
    name: "equipment_id",
    label: "Matériel",
    type: "select",
    placeholder: "ID et Designation",
    required: true,
  },
  {
    name: "client_id",
    label: "ID et nom client",
    type: "select",
    placeholder: "Ex: 1000",
    required: true,
  },
  {
    name: "sale_date",
    label: "Date",
    type: "Date",
    required: true,
  },
];

const tabHeader = [
  "Id matériel",
  "Désignation matériel",
  "Client",
  "Date",
  "Action",
];
const tabField = [
  ["equipment", "ref"],
  ["equipment", "design"],
  ["client", "first_name"],
  "sale_date",
  "action",
];
const key = "sales";

const SalesList = () => {
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
    data: { sales },
    isError,
    isFetching,
  } = useSale();

  const {
    data: { equipments },
  } = useEquipment();
  const {
    data: { clients },
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
      Object.entries(mergeSale(data)).forEach(([name, value]) => {
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
    const data = {
      ...value,
      client_id: value.client_id.value,
      equipment_id: value.equipment_id.value,
    };
    mutate(data);
  };

  const OPTIONS = [
    {
      name: "equipment_id",
      options: equipmentToSelect(equipments),
    },
    {
      name: "client_id",
      options: clientToSelect(clients),
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
          tabValue={sales}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default SalesList;
