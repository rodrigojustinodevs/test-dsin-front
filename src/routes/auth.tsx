import { Routes, Route } from "react-router-dom";
import { Home} from "../pages/Home";
import { Login} from "../pages/Login";
import { EventRegisterPage } from "../pages/EventRegisterPage";
import { EventEditPage } from "../pages/EventEditPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RegistrationRegisterPage } from "../pages/RegistrationRegisterPage";
import { RegistrationEditPage } from "../pages/RegistrationEditPage";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route 
        path="/login"
        element={<Login />} />
      <Route
          path="/newEvent"
          element={<EventRegisterPage />}
      />
      <Route
          path="/eventEdit"
          element={<EventEditPage />}
      />
      <Route
          path="/registrations"
          element={<RegistrationPage />}
      />
      <Route
          path="/newRegistration"
          element={<RegistrationRegisterPage />}
      />
      <Route
          path="/registrationEdit"
          element={<RegistrationEditPage />}
      />
    </Routes>
  );
};
