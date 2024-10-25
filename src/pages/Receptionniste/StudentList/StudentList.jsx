import React, { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notiflix, { Loading, Report } from "notiflix";
import {
  add,
  remove,
  update,
  useStudent,
} from "../../../services/student/useStudent";
import IconCrud from "../../../components/IconCrud/IconCrud";
import Datatables from "../../../components/dataTable/Datatables";
import Search from "../../../components/add/Search";
import { convertJsonToFormData, filterImage } from "../../../utils/Functions";
import Inputs from "../../../components/input/Inputs";

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

const tabHeader = [
  "Image",
  "Matricule",
  "Nom",
  "Prénom(s)",
  "Adresse",
  "Email",
  "Action",
];
const tabField = [
  "image",
  "registration",
  "last_name",
  "first_name",
  "adress",
  "email",
  "action",
];
const key = "students";

const StudentList = () => {
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
    watch,
    handleSubmit,
  } = useForm();

  const {
    error: errorFetch,
    data: { students },
    isError,
    isFetching,
  } = useStudent();

  const { mutate } = useMutation({
    mutationFn: getValues("id") ? (v) => update(getValues("id"), v) : add,
    mutationKey: key,
    onMutate: (form) => {
      Loading.standard();
    },
    onSuccess: (data) => {
      Loading.remove();
      Notiflix.Notify.info("Succès", "Fermer");
      queryClient.invalidateQueries(key);
      setFile(null);
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
      setFile(data.image);
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
    console.log({ ...value, image: file });

    mutate(convertJsonToFormData({ ...value, image: file }));
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
        <div className="flex items-center gap-5 my-4">
          <img
            src={filterImage(file)}
            alt=""
            className="w-22 h-22 object-cover border-[3px] border-zinc-200 rounded-md cursor-pointer hover:border-zinc-400 transition-all"
            onClick={() => refFile.current.click()}
          />
          <input
            type="file"
            ref={refFile}
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
        </div>
      </Search>

      <div className="w-full">
        <Datatables
          tabHeader={tabHeader}
          tabField={tabField}
          isFetching={isFetching}
          tabValue={students}
          isError={isError}
          error={errorFetch}
          actionsTables={action}
          className="noLoading"
        />
      </div>
    </>
  );
};

export default StudentList;
