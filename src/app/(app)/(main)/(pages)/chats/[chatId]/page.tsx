import { getChat, getUser } from "@/lib/services";
import { ChatMessages } from "@/ui/chats/chat-messages";

export default async function Page({ params }: { params: { chatId: string } }) {
  const chat = await getChat(params.chatId);
  const user = await getUser();

  return <ChatMessages chat={chat} user={user} />;
}
