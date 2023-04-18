import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Refer to the variables in `:root` in index.css for consistency
const VIOLET = '#5C5F84';
const GRAY = '#95a3b3';
const TIFFANY_BLUE = '#84dcc6';
const DARK_VIOLET = '#4b4e6d';
const OFF_WHITE = '#fafafa';
const BLACK = '#242424';

export const WhiteTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: VIOLET,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: GRAY,
  },
  '& .MuiInputLabel-root': {
    color: GRAY,
  },
  '& .MuiOutlinedInput-input': {
    color: DARK_VIOLET,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: GRAY,
    },
    '&:hover fieldset': {
      borderColor: VIOLET,
    },
    '&.Mui-focused fieldset': {
      borderColor: VIOLET,
    },
  },
});

export const StyledButton = styled(Button)({
  backgroundColor: VIOLET,
  color: OFF_WHITE,
  '&:hover': {
    backgroundColor: TIFFANY_BLUE,
    color: DARK_VIOLET,
  },
});

export const InvisibleButton = styled(Button)({
  borderRadius: 0,
  backgroundColor: OFF_WHITE,
  color: BLACK,
  padding: 0,
  position: 'absolute',
  width: '100%',
  bottom: '0',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: OFF_WHITE,
  },
});

export const flexDisplayRow = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};
