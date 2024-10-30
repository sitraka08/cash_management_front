import React, { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import AchatsList from "./pages/Caissier/AchatsList/AchatsList";
import Signin from "./pages/Signin/Signin";
import RoomList from "./pages/Receptionniste/RoomList/RoomList";
import TrainingList from "./pages/Receptionniste/TrainingList/TrainingList";
import AssignmentList from "./pages/Caissier/AssignmentList/AssignmentList";
import ParticipationList from "./pages/Caissier/ParticipationList/ParticipationList";
import SalesList from "./pages/Caissier/SalesList/SalesList";
import EquipmentList from "./pages/Receptionniste/EquipmentList/EquipmentList";
import RentalList from "./pages/Caissier/RentalList/RentalList";

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

  useEffect(() => {
    if (AuthApi.isValidToken()) {
      setUserConnected(AuthApi.tokenDecode());
    }
  }, []);

  return (
    <div className="appContainer overflow-x-hidden">
      <Routes>
        <Route path="admin" element={<DefaultLayout />}>
          <Route index element={<Navigate to="stats" />} />
          <Route path="stats" element={<h2>Stat</h2>} />
          <Route path="users" element={<UserList />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="equipments" element={<EquipmentList />} />
          <Route path="profs" element={<ProfList />} />
          <Route path="students" element={<StudentList />} />
          <Route path="rooms" element={<RoomList />} />
          <Route path="trainings" element={<TrainingList />} />
          {/* ------------- */}
          <Route path="assignment" element={<AssignmentList />} />
          <Route path="participations" element={<ParticipationList />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="rentals" element={<RentalList />} />

          <Route path="profil" element={<Profile />} />
        </Route>
        <Route path="caisse" element={<DefaultLayout />}>
          <Route index element={<Navigate to="stats" />} />
          <Route path="stats" element={<UserList />} />
          <Route path="assignment" element={<AffectationList />} />
          <Route path="achats" element={<AchatsList />} />
        </Route>

        <Route path="" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
