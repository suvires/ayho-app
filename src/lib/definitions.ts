import { off } from "process";

export type Role = {
  id: number;
  name: string;
};

export type Company = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  image_width: number;
  image_height: number;
  user_id: string;
  offers?: Offer[];
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  company: Company;
  roles: Role[];
};

export type Offer = {
  id: number;
  title: string;
  description: string;
  company_id: number;
};

export type Attendance = {
  id: number;
  name: string;
};

export type Schedule = {
  id: number;
  name: string;
};

export type Position = {
  id: number;
  name: string;
};

export type Skill = {
  id: number;
  name: string;
};

export type Place = {
  id: number;
  name: string;
};
