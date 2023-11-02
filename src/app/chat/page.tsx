import ChatClient from '@/components/chat/ChatClient';
import getCurrentUser from '../actions/getCurrentUser'

export default async function Page() {
  const currentUser = await getCurrentUser();
  
  return (
    <ChatClient
      currentUser={currentUser}
    />
  )
}