import { StyledButton, WhiteTextField, flexDisplayRow } from './customMuiStyle';
import Container from '@mui/material/Container';
import { FormEvent, useRef, useState } from 'react';
import ColorPaletteContainer, {
  ImagePalette,
  ImagePaletteState,
} from './colorPaletteContainer';
import axios from 'axios';
import NavBar from './navBar';

const initialState: ImagePaletteState = { lastIndex: 0, data: [] };

function HomePage(): JSX.Element {
  const [imagePalette, setImagePalette] =
    useState<ImagePaletteState>(initialState);
  const urlRef = useRef<HTMLInputElement>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = urlRef.current?.value;
    if (typeof url !== 'string' || url === '') alert('Please enter valid URL');
    else {
      axios
        .post('/swatch/getPalette', {
          url: urlRef.current?.value,
        })
        .then((response) =>
          setImagePalette({
            lastIndex: imagePalette.lastIndex + 1,
            data: [
              ...imagePalette.data,
              {
                url,
                index: imagePalette.lastIndex,
                palettes: response.data.swatches,
              },
            ],
          })
        )
        .catch((error) => alert(`Failed to fetch palette: ${error}`));
      if (urlRef.current) urlRef.current.value = '';
    }
  };

  const handleDelete = (index: number): void => {
    const newData: ImagePalette[] = imagePalette.data.filter(
      (data: ImagePalette) => data.index !== index
    );
    setImagePalette({ ...imagePalette, data: newData });
  };

  return (
    <>
      <NavBar />
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
        {imagePalette.data.map((obj: ImagePalette) => {
          return (
            <ColorPaletteContainer
              key={`${obj.index}`}
              handleDelete={handleDelete}
              imagePalette={obj}
            />
          );
        })}
      </Container>
    </>
  );
}

export default HomePage;
