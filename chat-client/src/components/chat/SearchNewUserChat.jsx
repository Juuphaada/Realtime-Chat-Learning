import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
import { Stack } from 'react-bootstrap';
import avarter from "../../assets/avarter.svg";
import { Prev } from 'react-bootstrap/esm/PageItem';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginBottom: 0,
  width: '70%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: '30%',
  },
  color: 'RGBA(255,255,255)',
  zIndex: 1 
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchUsers = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 300,
  color: 'RGBA(255,255,255)',
  zIndex: 1, 
  minHeight: 'auto',
  maxHeight: 500,
  overflowY: "auto",
  background: 'rgb(25, 25, 25)'
}));

function SearchNewUserChat() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {updateSearchUser,searchUser,setSearchUser} = useContext(ChatContext);

  return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => updateSearchUser(e.target.value)}
            />
        </Search>
  );
}

function ShowSearchUsers() {
  const {user} = useContext(AuthContext);
  const {potentialChats , createChat , onlineUsers ,searchUser, searchUserResult,
        setSearchUserResult} = useContext(ChatContext);

  return (
    <SearchUsers>
      <Stack>

        {searchUserResult && 
            searchUserResult.map((u,index)=>{
                return(
                  <div className="user-card" key={index} onClick={()=>createChat(user._id, u._id)}>
                    <Stack direction="horizontal">
                        <img src={avarter} height="40px" style={{marginLeft:10}}/>

                      {/* user._id : id of main user , u._id    : id of potential user */}
                      <Stack direction="vertical" gap={2} style={{marginLeft:5, marginTop:10, marginBottom:10}}>
                        <div>
                          {u.name} 
                          <span className={onlineUsers?.some((user) => user?.userId === u?._id )? "search-user-online":""}></span>
                        </div>
                        <div className="text-secondary">{u.email}</div>
                      </Stack>
                    </Stack>
                  </div>
                );
            })}
      </Stack>
        
    </SearchUsers>
  );
}

export {SearchNewUserChat,ShowSearchUsers}