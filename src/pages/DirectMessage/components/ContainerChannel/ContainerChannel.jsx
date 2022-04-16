import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';
import { ChannelCore, ChannelCreate, ChannelEdit } from '..';
import './ContainerChannel.css';

const ContainerChannel = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => 
{
    // When the user clicks the + button to create new channel
    if(isCreating) {
        return (
            <div className="channel-big-container">
                <ChannelCreate createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    // When the user clicks the edit button to edit a channel
    if(isEditing) {
        return (
            <div className="channel-big-container">
                <ChannelEdit setIsEditing={setIsEditing} />
            </div> 
        )
    }

    // The initial messages when the user starts a new message stream
    const InitialMessages = () => (
        <div className="channel-container-initial">
            <p className="channel-message-one">This is the beginning of your chat history.</p>
            <p className="channel-message-two">Send messages, attachments, links, emojis, and more!</p>
        </div>
    )

    // The <MessageTeam /> component is the component of each message
    return (
        <div className="channel-big-container">
            {/*The channel where chat takes place */}
            <Channel
                EmptyStateIndicator={InitialMessages}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelCore setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}

export default ContainerChannel;