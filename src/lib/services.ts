"use server";

import { auth } from "@/auth";
import { API_ROUTES } from "@/constants";

export async function getChats() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_USER_CHATS}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getChat(chatId: string) {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_USER_CHAT}/${chatId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getMatches() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_USER_MATCHES}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getMatch(matchId: string) {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_USER_MATCH}/${matchId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getOffers() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_USER_OFFERS}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getUser() {
  const session = await auth();
  const res = await fetch(`${process.env.BACKEND_URL}/${API_ROUTES.GET_USER}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session!.accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getAttendances() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_ATTENDANCES}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getSchedules() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_SCHEDULES}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getPositions() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_POSITIONS}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getSkills() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_SKILLS}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getPlaces() {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/${API_ROUTES.GET_PLACES}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
