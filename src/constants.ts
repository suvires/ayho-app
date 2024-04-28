export const ROLE = {
  RECRUITER: "Recruiter",
  CANDIDATE: "Candidate",
};
export const CREATE_PROFILE_STEPS = 7;
export const PLACES_ANYPLACE_ID = 53;
export const PROFILE_MAX_POSITIONS = 3;
export const PROFILE_MAX_SKILLS = 7;
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const API_ROUTES = {
  SIGN_IN: "api/auth/signin",
  SIGN_UP: "api/auth/signup",
  CREATE_PROFILE: "api/create-profile",
  GET_USER: "api/auth/me",
  GET_USER_OFFERS: "api/get-offers",
  LIKE_OFFER: "api/offer/like",
  DISLIKE_OFFER: "api/offer/dislike",
  UNDO_OFFER: "api/offer/undo",
  GET_MATCH: "api/get-match",
  GET_MATCHES: "api/get-matches",
  GET_ATTENDANCES: "api/attendances",
  GET_SCHEDULES: "api/schedules",
  GET_POSITIONS: "api/positions",
  GET_SKILLS: "api/skills",
  GET_PLACES: "api/places",
};
