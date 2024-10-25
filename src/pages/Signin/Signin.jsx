import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_FORM, YUP_SCHEMA_LOGIN_FORM } from "./login";
import Inputs from "../../components/input/Inputs";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../services/Auth/useAuth";
import { Loading, Notify } from "notiflix";
import AuthApi from "../../utils/AuthApi";
import { userConnectedStore } from "../../store/userConnectedStore/userConnectedStore";
import logo from "../../assets/images/logo.png";

const Signin = () => {
  const setUserConnected = userConnectedStore((s) => s.setUserConnected);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(YUP_SCHEMA_LOGIN_FORM),
  });
  const { mutate } = useMutation({
    mutationFn: (e) => useAuth.login(e),
    mutationKey: ["login"],
    onMutate: (form) => {
      // Loading.standard();
    },
    onSuccess: ({ token }) => {
      AuthApi.setTokenInLocalStorage(token);
      setUserConnected(AuthApi.decodeToken(token));
      Loading.remove();
      navigate(`/${AuthApi.decodeToken(token)?.role}`);
    },
    onError: (error) => {
      console.log(JSON.parse(error.message));
      Loading.remove();
      Notify.failure(" Une erreur s'est produite lors de la connexion");
    },
  });
  const loginAction = (e) => {
    // console.log(e);
    mutate(e);
  };

  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen bg-[#dddbdb]  noLoading">
      <div
        className="rounded-md overflow-hidden w-[400px]
      bg-white shadow-lg my-5 flex justify-between items-center "
      >
        <form
          className=" h-full w-full flex flex-col justify-center 
          items-center px-[10%] py-20 space-y-5 border-l-[6px] border-r-[6px] border-primary"
          noValidate
          onSubmit={handleSubmit(loginAction)}
        >
          <img src={logo} alt="" className="w-30 rounded-full" />
          {LOGIN_FORM.map((value) => (
            <Inputs
              key={value.name}
              label={value.label}
              register={register(value.name)}
              required={value.required}
              type={value.type}
              error={errors[value.name]?.message}
            />
          ))}
          <button
            className="w-[200px] h-[40px] text-white rounded-md shadow-lg bg-[#4B82F4] hover:bg-[#4b83f4a7] hover:shadow-2xl"
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
