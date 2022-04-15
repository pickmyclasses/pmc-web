import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelTeamList, ChannelTeamPreview } from '..';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import LogoutIcon from '../../img/logout.png';

import './ContainerChannelList.css';

const cookies = new Cookies();

// The sidebar that contains icons, will add link to admin's data table
const SideBar = ({ logout }) => (
    <div className="channel-list-sidebar">
        <Link to="/admin">
            <button>Data Table</button>
        </Link>
        <div className="channel-list-sidebar-icon2">
            <div className="icon" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => 
{
    // chat context is the data that the client holds with respect to the API KEY
    // that was used to make the connection to Stream Chat
    const { client } = useChatContext();

    // log out simply by removing the data from the cookies
    const logout = () => 
    {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        // reload the window after loging out
        window.location.reload();
    }

    // this filters the channel that the user has been added by using the userID
    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            {/*SideBar with a log out function */}
            <SideBar logout={logout} />

            <div className="channel-list-wrapper">

                {/* The title of the bar */}
                <div className="channel-list-header">
                    <p className="channel-list-header-text">Administrators</p>
                </div>
                
                {/* This list is the Channels list. ChannelList is a built-in component of stream-chat-react*/}
                {/* ChannelTeamList and ChannelTeamPreview are custom components */}
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <ChannelTeamList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChannelTeamPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />

                {/*This list is the direct message list */}
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <ChannelTeamList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChannelTeamPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ContainerChannelList = ({ setCreateType, setIsCreating, setIsEditing }) => {
    return (
        <>
            <div className="channel-list-container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>
        </>
    )

}

export default ContainerChannelList;