import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';

import { InnerChannel, ChannelCreate, ChannelEdit, MessageTeam } from './'


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

    return(
        <div>
            ContainerChannel
        </div>
    )
}

export default ContainerChannel