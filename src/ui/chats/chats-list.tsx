import { Chat } from "@/lib/definitions";
import { ChatItem } from "@/ui/chats/chat-item";

export default function ChatsList({ chats }: { chats: Chat[] }) {
  return (
    <ul className="matches-list">
      {chats.map((chat: Chat) => (
        <li key={chat.id}>
          <ChatItem chat={chat} />
        </li>
      ))}
    </ul>
  );
}
