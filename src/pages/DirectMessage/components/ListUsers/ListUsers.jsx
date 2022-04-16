import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

// This is the front-end of the pannel to invite the users to the chat channel
// Where 'children' are the users

import './ListUsers.css';

const ListContainer = ({ children }) => 
{
    return (
        <div className="panel-user-list">
            <div className="panel-user-list-header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => 
{
    // boolean selected used for toggling the value
    const [selected, setSelected] = useState(false)

    // Select and un-select process
    const handleSelect = () => 
    {
        if(selected) 
        {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else 
        {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="panel-user-selection" onClick={handleSelect}>
            <div className="panel-user-name-and-avatar">
                {/* name is used to hover to the avatar */}
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="panel-user-name">{user.fullName || user.id}</p>
            </div>
            {selected ? "X" : "O"}
        </div>
    )
}


const ListUsers = ({ setSelectedUsers }) => 
{
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => 
    {
        const getUsers = async () => 
        {
            if(loading) return;

            setLoading(true);
            
            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 } 
                );

                if(response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
               setError(true);
            }
            setLoading(false);
        }

        if(client) getUsers()
    }, []);

    if(error) {
        return (
            <ListContainer>
                <div className="status-message-user-list">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <div className="status-message-user-list">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="status-message-user-list">
                Loading users...
            </div> : (
                users?.map((user, i) => (
                  <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />  
                ))
            )}
        </ListContainer>
    )
}

export default ListUsers;