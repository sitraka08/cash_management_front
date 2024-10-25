import React, { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRefToastStore } from "./store/useRefToastStore/useRefToastStore";
import { Loading } from "notiflix";
import { useIsFetching } from "@tanstack/react-query";
import DefaultLayout from "./layout/DefaultLayout";
import AuthApi from "./utils/AuthApi";
import { userConnectedStore } from "./store/userConnectedStore/userConnectedStore";
import Profile from "./pages/profile/Profile";
import UserList from "./pages/Receptionniste/User/UserList";
import ClientList from "./pages/Receptionniste/ClientList/ClientList";
import ProfList from "./pages/Receptionniste/ProfList/ProfList";
import StudentList from "./pages/Receptionniste/StudentList/StudentList";
import AffectationList from "./pages/Caissier/AffectationList/AffectationList";
import ParticipationsList from "./pages/Caissier/ParticipationsList/ParticipationsList";
import VenteList from "./pages/Caissier/VenteList/VenteList";
import LogementsList from "./pages/Caissier/LogementsList/LogementsList";
import AchatsList from "./pages/Caissier/AchatsList/AchatsList";
import Signin from "./pages/Signin/Signin";
import RoomList from "./pages/Receptionniste/RoomList/RoomList";
import TrainingList from "./pages/Receptionniste/TrainingList/TrainingList";

AuthApi.setup();

function App() {
  const { pathname } = useLocation();
  const isFetching = useIsFetching();
  const navigate = useNavigate();
  const setUserConnected = userConnectedStore((s) => s.setUserConnected);

  useEffect(() => {
    if (AuthApi.isValidToken()) {
      setUserConnected(AuthApi.tokenDecode());
    } else {
      navigate("/");
    }
  }, [pathname]);

  const setRefToast = useRefToastStore((state) => state.setRefToast);
  const toastRef = useRef(null);
  useEffect(() => {
    setRefToast(toastRef);
    if (AuthApi.isValidToken()) {
      setUserConnected(AuthApi.tokenDecode());
    }
  }, []);

  return (
    <div className="appContainer overflow-x-hidden">
      <Toast ref={toastRef} />
      <Routes>
        <Route path="admin" element={<DefaultLayout />}>
          <Route index element={<Navigate to="stats" />} />
          <Route path="stats" element={<h2>Stat</h2>} />
          <Route path="users" element={<UserList />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="profs" element={<ProfList />} />
          <Route path="students" element={<StudentList />} />
          <Route path="rooms" element={<RoomList />} />
          <Route path="trainings" element={<TrainingList />} />
          <Route path="profil" element={<Profile />} />
        </Route>
        <Route path="caisse" element={<DefaultLayout />}>
          <Route index element={<Navigate to="stats" />} />
          <Route path="stats" element={<UserList />} />
          <Route path="affectations" element={<AffectationList />} />
          <Route path="participations" element={<ParticipationsList />} />
          <Route path="ventes" element={<VenteList />} />
          <Route path="logements" element={<LogementsList />} />
          <Route path="achats" element={<AchatsList />} />
        </Route>

        <Route path="" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
