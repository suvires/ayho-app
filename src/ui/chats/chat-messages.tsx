"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Chat, User } from "@/lib/definitions";
import { sendMessage } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function ChatMessages({ chat, user }: { chat: Chat; user: User }) {
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const [contentValue, setContentValue] = useState("");
  const initialState = { message: "", errors: {} };
  const sendMessageWithId = sendMessage.bind(null, chat.id);
  const [state, dispatch] = useFormState(sendMessageWithId, initialState);

  useLayoutEffect(() => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
      chatSectionRef.current.style.removeProperty("visibility");
    }
  }, [state]);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContentValue(event.target.value);
  };

  useEffect(() => {
    if (state.sended) {
      setContentValue("");
    }
  }, [state]);

  return (
    <>
      <Link href="/chats" className="header--back">
        <Image
          src="/images/icons/back.png"
          width={32}
          height={60}
          alt="Atrás"
          className="back"
          priority={true}
        />
      </Link>
      <div className="chat">
        <header>
          <figure>
            <Image
              width={chat.offer.company.image_width}
              height={chat.offer.company.image_height}
              alt={`Logotipo de ${chat.offer.company.name}`}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${chat.offer.company.image_url}`}
            />
          </figure>
          <div>
            <h2>{chat.offer.company.name}</h2>
            <h1>{chat.offer.title}</h1>
          </div>
        </header>
        <main ref={chatSectionRef} style={{ visibility: "hidden" }}>
          <section>
            <ul>
              {chat.messages.map((message, index) => (
                <li key={index} className={`${message.sender}`}>
                  <p>{message.content}</p>
                  <time>{message.created_at}</time>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <footer>
          <form action={dispatch}>
            {state.errors?.content &&
              state.errors.content.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.message && <p className="error">{state.message}</p>}
            <div className="input">
              <textarea
                placeholder="Escribe tu mensaje"
                name="content"
                value={contentValue}
                onChange={handleContentChange}
              ></textarea>
              <FormButton />
            </div>
          </form>
        </footer>
      </div>
    </>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>Enviar</button>;
}
