import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo, VIOLET, flexRow } from './customMuiStyle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => setAnchorEl(null);

  const handleSignOut = (): void => {
    try {
      axios.delete('/users/logout').then((response) => {
        if (response.status === 200) {
          navigate('/');
        } else {
          alert('Failed to sign out.');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      position='static'
      sx={{
        ...flexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: `${VIOLET}`,
        paddingLeft: '2rem',
        paddingRight: '2rem',
        marginBottom: '3rem',
      }}
    >
      <Logo>SwatchMyImage</Logo>
      <IconButton
        size='large'
        edge='end'
        color='inherit'
        aria-label='menu'
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='account'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
