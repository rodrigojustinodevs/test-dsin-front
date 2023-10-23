import { useState } from "react";
import { DrawerComponent } from "../Drawer";
import { NavBar } from "../NavBar";
import styles from "./contentBar.module.less";

interface ContentBarProps {
  children?: JSX.Element | JSX.Element[];
}

export function ContentBar({ children }: ContentBarProps) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
      <div className={styles.content}>
        <NavBar toggleDrawer={toggleDrawer} />
        <div>{children}</div>
      </div>
    </div>
  );
}
