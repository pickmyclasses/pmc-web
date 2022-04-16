import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import './ChannelTeamPreview.css';

const ChannelTeamPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => 
{
    // assigned channel to activeChannel
    // client is the client side that we set up in the grand parent component using API SECRET
    const { channel: activeChannel, client } = useChatContext();

    // Name of the channels
    const ChannelNames = () => (
        <p className="channel-preview-item-names">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );


    // Name of the DM contacts
    const DMContactNames = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        return (
            <div className="channel-preview-item-names single">
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
        //change the class name depends on where the channel is being selected or not
        //because the css will be different
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-name-selected'
                : 'channel-name'
        }
        // shows the details of the channel when click and set the field to default value
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {/*if type === 'team', shows Channels, else show direct message contacts */}
            {type === 'team' ? <ChannelNames /> : <DMContactNames />}
        </div>
    );
}

export default ChannelTeamPreview;