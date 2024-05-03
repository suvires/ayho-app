import { getChats } from "@/lib/services";
import ChatsList from "@/ui/chats/chats-list";

export default async function Page() {
  const chats = await getChats();

  if (chats.length === 0)
    return (
      <div className="empty-message">
        <p>Ninguna empresa ha iniciado aún un chat.</p>
      </div>
    );

  return <ChatsList chats={chats} />;
}
