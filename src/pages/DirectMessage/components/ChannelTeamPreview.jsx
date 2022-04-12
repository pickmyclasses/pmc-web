import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const ChannelTeamPreview = ({channel, type}) => 
{
    // re-name channel to activeChannel because we already have channel at the top
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => {
        <p className='channel-preview__item'>
            # {channel?.data?.name || channel?.data?.id}
        </p>
    }

    // => () returns object
    // => {} function body  
    const DirectPreview = () => 
    {
        // filter is a function that takes a callback function with the parameter of { user } 
        // and returns an array where user.id !== client.userID
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        return(
            <div className='channel-preview__item single'>
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                <p>{members[0]?.user?.fullName}</p>
            </div>
        )
    }

    return(
        <div className={channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'} 
             onClick={() => {console.log(channel)}}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
};

export default ChannelTeamPreview;