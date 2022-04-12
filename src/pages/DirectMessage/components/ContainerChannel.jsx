import React from 'react';
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';

import { InnerChannel, ChannelCreate, ChannelEdit } from './'


const ContainerChannel = ({
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    createType
}) => {
    const { channel } = useChatContext();

    if(isCreating)
    {
        return(
            <div className='channel__container'>
                <ChannelCreate createType={createType} setIsCreating={setIsCreating}/>
            </div>
        )
    }

    if(isEditing)
    {
        return(
            <div className='channel__container'>
                <ChannelEdit setIsEditing={setIsEditing}/>
            </div>
        )
    }

    // => () means return object
    const EmptyState = () => (
        <div className='channel-empty__container'>
            <p className='channel-empty__first'>This is the beginning of your chat history</p>
            <p className='channel-empty__second'>Send messages</p>
        </div>
    )

    return(
        <div className='channel__container'>
            <Channel 
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, index) => <MessageTeam key={index} {...messageProps} />}
            >
                <InnerChannel/>
            </Channel>
        </div>
    )
}

export default ContainerChannel