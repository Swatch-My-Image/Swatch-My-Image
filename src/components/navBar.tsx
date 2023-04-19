import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo, VIOLET, flexRow } from './customMuiStyle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

function NavBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => setAnchorEl(null);

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
        <MenuItem>Sign Out</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
