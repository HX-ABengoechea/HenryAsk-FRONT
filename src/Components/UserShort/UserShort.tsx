/*--------------------------------------------------------*/
/*-----------IMPORT UTILITIES-----------*/
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Owner, User } from "../../app/interface";
import { Link } from "react-router-dom";
import { getUserById, userTemplate } from "../../app/Utils/userUtilities";
/*-----------IMPORT MUI & CSS-----------*/
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Avatar, Link as MUILink, Typography } from "@mui/material";
/*--------------------------------------------------------*/
interface Props {
  user: Owner;
}
export const UserShort = ({ user }: Props) => {
  return (
    <Typography display={"flex"} variant="caption" alignItems="center">
      <Avatar
        sx={{
          width: "30px",
          height: "30px",
          display: "inline",
          mx: 1,
          zIndex: 2,
          ["&:before"]: {
            zIndex: -1,
            content: "''",
            display: "block",
            backgroundColor: "primary.light",
            width: "30px",
            height: "30px",
            position: "absolute",
          },
        }}
        src={user?.profile_picture}
      />
      <MUILink href={`/Profile/${user._id}`}>{user?.user_name}</MUILink>
    </Typography>
  );
};
