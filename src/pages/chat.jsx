import React from 'react'

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

export default function PagesChat() {
  return (
    <ChatEngineWrapper>
      <ChatSocket
        projectID="7011783e-a51e-473f-9e3b-34629dbe2b33"
        chatID="76641"
        chatAccessKey="ca-9a908fd5-2669-490d-99cd-c22ce6ac8b39"
        senderUsername="peter"
      />

      <ChatFeed activeChat="76641" />
    </ChatEngineWrapper>
  )
}
