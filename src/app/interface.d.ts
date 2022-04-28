export interface User {
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    city: string;
    role: number;
    user_name: string;
    profile_picture: string;
    biography: string;
    password: string;
    posts: Array<string>;
    answers: Array<string>;
    comments: Array<string>;
    own_henry_coin: number;
    give_henry_coin: number;
    theoric: Array<string>;
    excersices: Array<string>;
  }
  export interface InitialState {
    data: User;
    loading: string;
    profile:User;
  }