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

export type User = {
  id: string;
  name: string;
  email: string;
  company: Company;
  roles: Role[];
  positions: Position[];
  skills: Skill[];
  places: Place[];
  attendances: Attendance[];
  schedules: Schedule[];
  profile: Profile;
};

export type Profile = {
  image_url: string;
  salary: number;
  linkedin: string;
};

export type Offer = {
  id: number;
  title: string;
  description: string;
  salary: number;
  positions: Position[];
  skills: Skill[];
  places: Place[];
  attendance: Attendance;
  schedule: Schedule;
  company: Company;
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

export type Match = {
  id: number;
  offer: Offer;
};
