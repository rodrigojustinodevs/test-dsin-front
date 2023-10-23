import { Divider, IconButton, List, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Menu from "@mui/icons-material/Menu";
import { useState } from "react";
import { mainListItems, secondaryListItems } from "../MenuItem";
import styles from "./drawer.module.less";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor: `var(--grey)`,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      display: open ? "block" : "none",
    },
  },
}));

interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

export function DrawerComponent({ open, toggleDrawer }: DrawerProps) {
  return (
    <div className={styles.container}>
      <Drawer variant="permanent" open={open} className={styles.container}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open === true ? "space-between" : "flex-start",
            px: [1],
            className: styles.toolbar,
          }}
        >
          {open === true && (
            <img src="/src/assets/logo.png" alt="" className="logo" />
          )}
          <IconButton onClick={toggleDrawer}>
            {open ? <RadioButtonCheckedIcon /> : <Menu />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */}
        </List>
      </Drawer>
    </div>
  );
}
