import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { User } from "../../app/interface";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

interface Props {
  id: string;
}
export const UserShort = ({ id }: Props) => {
  const getUser = async (id: string) => {
    try {
      let user = await (await axios.get(`/user/${id}`)).data;
      console.table(user);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  const [user, setUser] = useState({
    _id: "",
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    role: 0,
    country: "",
    city: "",
    profile_picture: "",
    biography: "",
    own_henry_coin: 0,
    give_henry_coin: 0,
    theoric: [],
    posts: [],
    answers: [],
    comments: [],
    excersices: [],
  });
  useEffect(() => {
    if (!user.first_name) {
      getUser(id);
    }
  }, [user]);

  return (
    <span>
      <MUILink href={`/Profile/${id}`}>{user?.user_name}</MUILink>
      <AccountCircleRoundedIcon />
    </span>
  );
};
