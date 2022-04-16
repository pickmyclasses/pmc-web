import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { ListUsers } from '..';
import './ChannelCreate.css';

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

    return (
        <div className="channel-edit-add">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

// This component renders the panel to create new channel
const ChannelCreate = ({ createType, setIsCreating }) => 
{
    // client is the client-side that was established using Chat Context
    const { client, setActiveChannel } = useChatContext();
    // selected user will store the user id of the selected one
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    // channelName is a property of type string that initially = '';
    const [channelName, setChannelName] = useState('');

    // Called when the user click Create Channel
    const createChannel = async (e) => 
    {
        // Prevent the page from loading
        e.preventDefault();

        try 
        {
            // newChannel object with a new name and selected users to be added initially
            const newChannel = await client.channel(createType, channelName, 
            {
                name: channelName, members: selectedUsers
            });

            await newChannel.watch();

            // reset the fields after creating the new channel
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);

        } catch (error) 
        {
            console.log(error);
        }
    }

    return (
        <div className="panel-create-channel">
            <div className="panel-create-channel-header">
                {/* The header will depends on the type of team. If team, the header = 'Create a New Channel', else 'Send a Direct Message' */}
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                {/*The close button to close the Create New Channel panel */}
                <button onClick={() => {setIsCreating(false)}}>Close</button>
            </div>
            {/*If createType === 'team', renders the <ChannelNameInput> component */}
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            {/*The list of users available to add to channel or direct message */}
            <ListUsers setSelectedUsers={setSelectedUsers} />
            {/*The button to create a channel or direct message */}
            <div className="panel-create-channel-button" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default ChannelCreate;