import React, { useEffect, useRef, useState } from "react";
import { convertJsonToFormData, filterImage } from "../../utils/Functions";
import Buttons from "../../components/button/Buttons";
import Inputs from "../../components/input/Inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { update, useProfil } from "../../services/profil/useProfil";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthApi from "../../utils/AuthApi";

const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
  nom: yup.string().required("Nom requis"),
  telephone: yup.string().required("Téléphone requis"),
  cin: yup.string().required("CIN requis"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .test(
      "len",
      "Le mot de passe doit contenir au moins 8 caractères",
      (val) => val.length >= 8
    ),
  confirm_password: yup
    .string()
    .required("Confirmation de mot de passe requis")
    .test("is-same", "Les mots de passe ne correspondent pas", function (val) {
      return this.parent.password === val;
    }),
});

const Profile = () => {
  const navigate = useNavigate();
  const refImage = useRef(null);
  const [image, setImage] = useState(null);
  const {
    data: { personnel },
  } = useProfil();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      navigate("/");
      AuthApi.logout();
      Reporter.success("Profil mis à jour avec succès");
    },
  });

  useEffect(() => {
    if (personnel) {
      setValue("nom", personnel.nom);
      setValue("email", personnel.email);
      setValue("telephone", personnel.telephone);
      setValue("cin", personnel.cin);
      setImage(personnel.pdp);
    }
  }, [personnel]);

  const submit = (value) => {
    const data = {
      ...value,
      pdp: image,
    };

    mutate(convertJsonToFormData(data));
  };
  return (
    <div className="w-full flex items-center justify-center">
      <form
        className="border rounded p-8 min-w-[80%]"
        noValidate
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex items-center gap-2">
          <img
            className="w-30 h-30 rounded-full object-cover"
            alt=""
            src={filterImage(image)}
          />
          <input
            type="file"
            className="hidden"
            ref={refImage}
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />

          <Buttons
            label="Changer la photo de profil"
            severity="info"
            onClick={() => refImage.current.click()}
            type="button"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3 place-items-start">
          <Inputs
            label="Nom"
            type="text"
            placeholder="Nom"
            value=""
            register={register("nom")}
            required
            error={errors.nom?.message}
          />
          <Inputs
            label="Email"
            type="email"
            placeholder="Email"
            value=""
            register={register("email")}
            required
            error={errors.email?.message}
          />
          <Inputs
            label="Téléphone"
            type="text"
            placeholder="Téléphone"
            value=""
            register={register("telephone")}
            required
            error={errors.telephone?.message}
          />
          <Inputs
            label="CIN"
            type="text"
            placeholder="CIN"
            value=""
            register={register("cin")}
            required
            error={errors.cin?.message}
          />
          <Inputs
            label="Mot de passe"
            type="password"
            placeholder="Mot de passe"
            value=""
            register={register("password")}
            required
            error={errors.password?.message}
          />
          <Inputs
            label="Confirmer le mot de passe"
            type="password"
            placeholder="Confirmer le mot de passe"
            value=""
            register={register("confirm_password")}
            required
            error={errors.confirm_password?.message}
          />
        </div>
        <div className="my-5">
          <Buttons label="Enregistrer" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
