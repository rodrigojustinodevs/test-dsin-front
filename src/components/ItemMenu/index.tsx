import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import styles from "./itemMenu.module.less";
import { useNavigate } from "react-router-dom";


interface ItemMenuProps {
  icon: JSX.Element;
  text: string;
  url: string;
}

export function ItemMenu({ icon, text, url }: ItemMenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(`${link}`);
  };
  return (
    <div className={styles.icon}>
      <ListItemButton 
      onClick={() => handleNavigation(url)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} className={styles.icon} />
      </ListItemButton>
    </div>
  );
}
