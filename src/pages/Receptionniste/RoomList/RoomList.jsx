import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import { add, remove, update, useRoom } from "../../../services/room/useRoom";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import { addOptions } from "../../../utils/Functions";
import Inputs from "../../../components/input/Inputs";

// model Room {
//   id           Int      @id @default(autoincrement())
//   room_number  String
//   rental_price Float
//   // Relations
//   rentals      Rental[]
// }

const FORM = [
  {
    name: "room_number",
    label: "Numero de salle",
    type: "text",
    placeholder: "Ex:001",
    required: true,
  },
  {
    name: "rental_price",
    label: "Prix de location",
    type: "text",
    placeholder: "Ex: 1000",
    required: true,
  },
];

const tabHeader = ["Numero de salle", "Prix de location", "Action"];
const tabField = ["room_number", "rental_price", "action"];
const key = "rooms";

const RoomList = () => {
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
    data: { rooms },
    isError,
    isFetching,
  } = useRoom();

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
        <div className="w-full  grid grid-cols-2 my-4 gap-5">
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
          tabValue={rooms}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default RoomList;
