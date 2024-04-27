export const ROLE = {
  EMPLOYER: "Employer",
  EMPLOYEE: "Employee",
};

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const API_ROUTES = {
  SIGN_IN: "api/auth/signin",
  SIGN_UP: "api/auth/signup",
  GET_PROFILE: "api/auth/me",
  GET_COMPANY_OFFERS: "api/offers/mycompany",
  CREATE_COMPANY: "api/create-company",
  CREATE_OFFER: "api/create-offer",
  GET_ATTENDANCES: "api/attendances",
  GET_SCHEDULES: "api/schedules",
  GET_POSITIONS: "api/positions",
  GET_SKILLS: "api/skills",
  GET_PLACES: "api/places",
};
