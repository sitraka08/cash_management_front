import React, { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import { add, remove, update, useUsers } from "../../../services/user/useUser";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import {
  addOptions,
  convertJsonToFormData,
  filterImage,
} from "../../../utils/Functions";
import Inputs from "../../../components/input/Inputs";
import { mergeUser } from "../../../utils/refactor/merge";
import * as yup from "yup";

const tabHeader = ["Image", "Nom", "Email", "Role", "Action"];
const tabField = ["image", "first_name", "email", "role", "action"];
const key = "users";
export const FORM = [
  {
    name: "first_name",
    label: "Nom",
    type: "text",
    placeholder: "Nom",
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
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Role",
    required: true,
    options: [
      {
        value: "admin",
      },
      {
        value: "Caissier",
      },
      {
        value: "Récéptionniste",
      },
    ],
    optionValue: "value",
    optionLabel: "value",
  },
];

const UserList = () => {
  const refFile = useRef();
  const [file, setFile] = useState(null);
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
        first_name: yup.string().required("Nom est obligatoire"),
        email: yup.string().email().required("Email est obligatoire"),
        role: yup.object("").required("Role est obligatoire"),
      })
    ),
  });

  const {
    error: errorFetch,
    data: { users },
    isError,
    isFetching,
  } = useUsers();

  const { mutate } = useMutation({
    mutationFn: getValues("id")
      ? (val) => update({ id: getValues("id"), data: val })
      : add,
    mutationKey: key,
    onMutate: (form) => {
      Loading.standard();
    },
    onSuccess: (data) => {
      Loading.remove();
      Notiflix.Notify.info("Succès", "Fermer");
      queryClient.invalidateQueries(key);
      reset();
      setFile(null);
    },
    onError: (error) => {
      Loading.remove();
      Notiflix.Notify.failure("Echec", "Fermer");
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
      Notiflix.Notify.info("Succès", "Fermer");
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
      setFile(data.image);
    };
    return (
      <IconCrud
        deleteAction={() => deleteFn(rowData.id)}
        editAction={editAction}
        onDelete={() => console.log("delete")}
        listAction={rowData.role != "admin" ? ["edit", "delete"] : ["edit"]}
        rowData={rowData}
      />
    );
  };

  console.log("render");

  const submit = (value) => {
    const data = {
      ...value,
      role: value.role.value,
      image: file,
    };
    mutate(convertJsonToFormData(data));
  };

  return (
    <>
      <Search
        onSubmit={handleSubmit(submit)}
        isEdited={watch("id")}
        onReset={() => {
          reset();
          setFile(null);
        }}
      >
        <div className="flex items-end gap-5 my-4">
          <img
            src={filterImage(file)}
            alt=""
            className="w-14 h-14 object-cover border-[3px] border-zinc-200 rounded-md cursor-pointer hover:border-zinc-400 transition-all"
            onClick={() => refFile.current.click()}
          />
          <input
            type="file"
            ref={refFile}
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="w-full  grid grid-cols-3  gap-5">
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
        </div>
      </Search>

      <div className="w-full">
        <Datatables
          tabHeader={tabHeader}
          tabField={tabField}
          isFetching={isFetching}
          tabValue={users}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default UserList;
