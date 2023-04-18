import { StyledButton, WhiteTextField, flexDisplayRow } from './customMuiStyle';
import Container from '@mui/material/Container';
import { FormEvent, useRef, useState } from 'react';
import ColorPaletteContainer, { ImagePalette } from './colorPaletteContainer';

const initialState: ImagePalette[] = [
  {
    url: '/Pokemon-Charizard-Desktop-Wallpapers-1.jpg',
    palettes: ['#1A2027', '#fff', '#1A2027', '#fff', '#1A2027'],
  },
  {
    url: '/charizard.jpeg',
    palettes: ['#fff', '#1A2027', '#fff', '#1A2027', '#fff'],
  },
];

function HomePage(): JSX.Element {
  // TODO: Query backend to get palettes via API and `setImagePalette`
  const [imagePalette, setImagePalette] = useState(initialState);
  const urlRef = useRef<HTMLInputElement>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Send request to backend to generate palette
    // and handle response accordingly
    alert(urlRef.current?.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Container sx={{ ...flexDisplayRow, gap: '1rem', marginBottom: 5 }}>
          <WhiteTextField
            fullWidth
            inputRef={urlRef}
            label='URL'
            style={{ width: '50vw' }}
          />
          <StyledButton type='submit'>Generate Palette</StyledButton>
        </Container>
      </form>
      {imagePalette.map((imagePalette) => (
        <ColorPaletteContainer key={imagePalette.url} {...imagePalette} />
      ))}
    </Container>
  );
}

export default HomePage;
