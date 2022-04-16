import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { ListUsers } from '..';
import './ChannelEdit.css';

// The component that shows the channel name
const ChannelNameInput = ({ channelName = '', setChannelName }) => 
{
    // When the user select the channel, the channel name will change accordingly
    const handleChange = (event) => 
    {
        // prevent the page from reloading
        event.preventDefault();

        // set channel name according to what the user choose
        setChannelName(event.target.value);
    }

    // Header of the pannel to add members
    return (
        <div className="channel-edit-add">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

// This component renders the panel to edit the existing channel
const ChannelEdit = ({ setIsEditing }) => 
{
    // the object that represent the current channel
    const { channel } = useChatContext();
    // the string property that stores the channel name
    const [channelName, setChannelName] = useState(channel?.data?.name);
    // the array property that stores the selected users
    const [selectedUsers, setSelectedUsers] = useState([])

    // function called when the user click update channel button
    const updateChannel = async (event) => 
    {
        // prevent the page from reloading
        event.preventDefault();

        // boolean to check if the channel's name has been changed yet
        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        // if true
        if(nameChanged) 
        {
            // update the channel name
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
        }

        // if the selected users > 0
        if(selectedUsers.length) 
        {
            await channel.addMembers(selectedUsers);
        }

        // restore the fields to the default value after changing the channel name
        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    /*The pannel that shows up when user click edit */
    return (
        <div className="panel-edit-channel">
            <div className="panel-edit-channel-header">
                <p>Edit Channel</p>
                {/*The close button to close the pannel */}
                <button onClick={() => { setIsEditing(false); }}>
                    Close
                </button>
            </div>
            {/*The input of the new channel name from the user */}
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            {/*List of the users the user want to add when editing the channel */}
            <ListUsers setSelectedUsers={setSelectedUsers} />
            {/*Save Changes button */}
            <div className="panel-edit-channel-button" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default ChannelEdit;