import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';
import './ChannelCore.css';

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
export const GiphyContext = React.createContext({});

const ChannelCore = ({ setIsEditing }) => 
{
  // boolean used to send GIF
  const [giphyState, setGiphyState] = useState(false);

  // sendMessage is a function object in useChannelActionContext
  const { sendMessage } = useChannelActionContext();
  
  const overrideSubmitHandler = (message) => 
  {
    // the object that represent the message to be sent
    let updatedMessage = 
    {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    // if the user sends giphy
    if (giphyState) 
    {
      // spread the updateMessage with the value at property text : `/giphy ${message.text}
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    // When sending the message, switch the Giphy state back to false
    if (sendMessage) 
    {
      sendMessage(updatedMessage);

      setGiphyState(false);
    }
  };

  // The MessageList component renders a scrollable list of messages. The UI for each individual message is rendered conditionally based on its message.type valu
  // The Window component handles width changes in the main channel to ensure a seamless user experience when opening and closing a Thread component.
  // The Thread component renders a list of replies tied to a single parent message in a channel's main message list.
  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

// This is the team channel header
const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();
  
    const MessagingHeader = () => 
    {
      // members are the members of a channel or the direct message receiver
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

      // if the channel is direct message
      if(channel.type === 'messaging') 
      {
        return (
          <div className='channel-core-header'>
            {members.map(({ user }, i) => (
              <div key={i} className='channel-core-header-avatar'>
                {/* This is the avatar in the white area*/}
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />

                {/* This is the name displayed on the white bar to the left of "X user(s) online" */}
                <p className='channel-core-header-avatar user'>{user.fullName || user.id}</p>
              </div>
            ))}
          </div>
        );
      }
  
      // The edit button area
      return (
        <div className='channel-core-edit-area'>
          <p className='channel-core-edit-area-text'># {channel.data.name}</p>
          <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
            <button>Edit</button>
          </span>
        </div>
      );
    };
  
    // Get number of users online
    const getNumberOfUsersOnline = (num) => {
      if (!num) return 'No users online';
      if (num === 1) return '1 user online';
      return `${num} users online`;
    };
  
    return (
      <div className='channel-core'>
        <MessagingHeader />
        <div className='channel-core-user-counter-div'>
          <p className='channel-core-user-counter-text'>{getNumberOfUsersOnline(watcher_count)}</p>
        </div>
      </div>
    );
  };

  export default ChannelCore;