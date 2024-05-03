import { Chat } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export function ChatItem({ chat }: { chat: Chat }) {
  return (
    <article className="match">
      <Link href={`/chats/${chat.id}`}>
        <figure>
          <Image
            width={chat.offer.company.image_width}
            height={chat.offer.company.image_height}
            alt={`Logotipo de ${chat.offer.company.name}`}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${chat.offer.company.image_url}`}
          />
        </figure>
        <section>
          <h3>{chat.offer.company.name}</h3>
          <h2>{chat.offer.title}</h2>
        </section>
      </Link>
    </article>
  );
}
