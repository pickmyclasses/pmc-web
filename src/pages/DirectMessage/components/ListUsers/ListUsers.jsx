import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import './ListUsers.css';

// This is the front-end of the pannel to invite the users to the chat channel
// Where 'children' are the users
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
            // if selected, set selected users = the ones selected except the current one
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else 
        {
            // spread the previous users with user.id
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        // toggle select and unselect
        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="panel-user-selection" onClick={handleSelect}>
            <div className="panel-user-name-and-avatar">
                {/* name is used to hover to the avatar */}
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="panel-user-name">{user.fullName || user.id}</p>
            </div>
            {/*If the User is selected, shows 'X', otherwise 'O' */}
            {selected ? "X" : "O"}
        </div>
    )
}


const ListUsers = ({ setSelectedUsers }) => 
{
    // the client context that was established with stream-chat server using secret key
    const { client } = useChatContext();
    // the array of user objects
    const [users, setUsers] = useState([]);
    // boolean loading to signal when the data is fully loaded
    const [loading, setLoading] = useState(false);
    // boolean to signal whether any users been found
    const [listEmpty, setListEmpty] = useState(false);
    // boolean to signal whether an error exists
    const [error, setError] = useState(false);

    // useEffect, call the call back function (1st parameter) and re-render the component
    useEffect(() => 
    {
        // get the users
        const getUsers = async () => 
        {
            // if is loading, return because we don't want to keep calling this function is the data
            // is still being loaded
            if(loading) return;

            // start loading the users
            setLoading(true);
            
            try 
            {
                // reponse is from the query of the users
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 } 
                );
                // if the response has > 0 users
                if(response.users.length) {
                    // set that response to array users
                    setUsers(response.users);
                } else {
                    // set boolean listEmpty = true because there is no user
                    setListEmpty(true);
                }
            } catch (error) 
            {
                // if caught an error, set boolean error = true
               setError(true);
            }
            // after finished loading, set loading = false
            setLoading(false);
        }

        if(client) getUsers()
    }, []);

    // if the boolean error is true, render the error message
    if(error) {
        return (
            <ListContainer>
                <div className="status-message-user-list">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    // if the user list is empty, render the no users message
    if(listEmpty) {
        return (
            <ListContainer>
                <div className="status-message-user-list">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    // else, there are users and no errors found, render the list of users
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