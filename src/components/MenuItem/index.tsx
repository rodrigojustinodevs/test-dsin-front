import DashboardIcon from "@mui/icons-material/Dashboard";
import { Event, AppRegistration } from "@mui/icons-material";
import { ItemMenu } from "../ItemMenu";

export const mainListItems = (
  <div>
    <ItemMenu icon={<Event />} text="Eventos" url="/home"/>
    <ItemMenu icon={<AppRegistration />} text="Inscrições" url="/registrations"/>
  </div>
);

export const secondaryListItems = (
  <div>
    <ItemMenu icon={<DashboardIcon />} text="Eventos" url="/home"/>
  </div>
);
