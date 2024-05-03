export const ROLE = {
  CANDIDATE: "Candidate",
  RECRUITER: "Recruiter",
};
export const CREATE_PROFILE_STEPS = 8;
export const PLACES_ANYPLACE_ID = 53;
export const PROFILE_MAX_POSITIONS = 5;
export const PROFILE_MAX_SKILLS = 10;
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const API_ROUTES = {
  SIGN_IN: "api/auth/signin",
  SIGN_UP: "api/auth/signup",
  CREATE_PROFILE: "api/create-profile",
  UPDATE_PROFILE: "api/update-profile",
  GET_USER: "api/auth/user",
  GET_USER_OFFERS: "api/get-offers",
  LIKE_OFFER: "api/offer/like",
  DISLIKE_OFFER: "api/offer/dislike",
  UNDO_OFFER: "api/offer/undo",
  GET_USER_MATCH: "api/get-match",
  GET_USER_MATCHES: "api/get-matches",
  GET_USER_CHATS: "api/chats/user",
  GET_USER_CHAT: "api/chat/user",
  SEND_MESSAGE: "api/chat/send-message",
  GET_ATTENDANCES: "api/attendances",
  GET_SCHEDULES: "api/schedules",
  GET_POSITIONS: "api/positions",
  GET_SKILLS: "api/skills",
  GET_PLACES: "api/places",
};
