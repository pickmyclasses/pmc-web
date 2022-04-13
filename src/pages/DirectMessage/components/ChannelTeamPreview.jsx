import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const ChannelTeamPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => 
{
    // assigned channel to activeChannel
    // client is the client side that we set up in the grand parent component using API SECRET
    const { channel: activeChannel, client } = useChatContext();

    // Name of the channels
    const ChannelNames = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );


    // Name of the DM contacts
    const DMContactNames = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelNames /> : <DMContactNames />}
        </div>
    );
}

export default ChannelTeamPreview;