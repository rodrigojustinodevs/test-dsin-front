import { WbSunny } from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Menu from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

import { useTheme } from "../../contexts/theme";
import styles from "./navBar.module.less";
import { useAuth } from "../../contexts/contexts";


interface NavBarProps {
  toggleDrawer: () => void;
}

const photo = "";

export function NavBar({ toggleDrawer }: NavBarProps) {
  const { toggleThemeMode, theme } = useTheme();
	const { signOut } = useAuth();


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.menuHamburguer}>
          <Menu onClick={toggleDrawer} />
        </div>

        {theme === "theme-light" ? (
          <DarkModeOutlinedIcon onClick={signOut} />
        ) : (
          <WbSunny onClick={signOut} />
        )}
      </div>

      <div className={styles.contentAvatar}>
        <div>
          <p>Rodrigo Justino</p>
          <p>Admin</p>
        </div>
        {/* <Avatar src={photo}>M</Avatar> */}
      </div>
    </div>
  );
}
