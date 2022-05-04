import axios from "axios";
import { Answer } from "../interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ownerTemplate } from "./userUtilities";

export const answerTemplate: Answer = {
  _id: "",
  owner: ownerTemplate,
  content: "",
  post: "",
  comments: [],
  createdAt: "",
};

export const postNewAnswer = createAsyncThunk(
  "post/fetchAnswerToSave",
  async (answer: Answer) => {
    let aux = { ...answer, owner: answer.owner._id };
    await axios.post(`/answer`, aux);
  }
);
export const fetchAnswerById = async (id: string | undefined) => {
  try {
    if (!id) {
      return answerTemplate;
    }
    return await (
      await axios.get(`/answer/${id}`)
    ).data;
  } catch (error) {
    console.log(error);
    return answerTemplate;
  }
};
