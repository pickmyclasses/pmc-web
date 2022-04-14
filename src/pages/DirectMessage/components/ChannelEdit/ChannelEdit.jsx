import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { ListUsers } from '..';
import './ChannelEdit.css';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-edit-add">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const ChannelEdit = ({ setIsEditing }) => {
    const { channel } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([])

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
        }

        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className="panel-edit-channel">
            <div className="panel-edit-channel-header">
                <p>Edit Channel</p>
                <button onClick={() => { setIsEditing(false); }}>
                    Close
                </button>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <ListUsers setSelectedUsers={setSelectedUsers} />
            <div className="panel-edit-channel-button" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default ChannelEdit;