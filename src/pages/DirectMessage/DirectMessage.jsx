import React, {useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ContainerChannel, ContainerChannelList, Auth } from './components';

import './DirectMessage.css';

const API_KEY = '9z6vzf5r88js';

const client = StreamChat.getInstance(API_KEY);

const cookies = new Cookies();

const authToken = cookies.get("token");

// connect the user and get all the messages
if(authToken) {
    client.connectUser({
        id: cookies.get("userId"),
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),
        image: cookies.get("avatarURL"),
        hashedPassword: cookies.get("hashedPassword"),
        phoneNumber: cookies.get("phoneNumber"),
    }, authToken)
}

const DirectMessage = () => 
{
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if(!authToken) return <Auth/>

    return (
        <div className='app_wrapper'>
            <Chat client={client} theme="team light">
                <ContainerChannelList 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ContainerChannel
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    )
}

export default DirectMessage;