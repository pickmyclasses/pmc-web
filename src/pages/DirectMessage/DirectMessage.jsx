import React, {useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ContainerChannel, ContainerChannelList, AdminAuthentication } from './components';
import 'stream-chat-react/dist/css/index.css';
import './DirectMessage.css';


const API_KEY = '9z6vzf5r88js';

// StreamChat set up a server to the client who holds the API_KEY
const client = StreamChat.getInstance(API_KEY);

// cookies are used to store data
const cookies = new Cookies();

// when the user click sign in, the server will return a token
// if the token is not null then the user is authenticated
const authToken = cookies.get("token");

// connect the user using the data stored in the cookie to get the messages
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

    // boolean isCreating to create new direct message to people
    const [isCreating, setIsCreating] = useState(false);

    // boolean isEditing to edit the channel
    const [isEditing, setIsEditing] = useState(false);

    // if the user is not authenticated -> renders the authentication form
    if(!authToken) return <AdminAuthentication/>

    return (
        <div className='app_wrapper'>
            <Chat client={client} theme="team light">
                 {/* The list of channels */}
                <ContainerChannelList 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                {/* The list of channels */}
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