import { StyledIconButton, VIOLET, flexDisplayRow } from './customMuiStyle';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PaletteButton from './copiedTooltip';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export interface ImagePaletteState {
  lastIndex: number;
  data: ImagePalette[];
}

export interface ImagePalette {
  url: string;
  index: number;
  palettes: string[];
}

function ColorPaletteContainer({
  handleDelete,
  imagePalette,
}: {
  handleDelete: (index: number) => void;
  imagePalette: ImagePalette;
}): JSX.Element {
  const { url, index, palettes } = imagePalette;
  return (
    <Container
      sx={{
        ...flexDisplayRow,
        gap: '3rem',
        marginBottom: '3rem',
      }}
    >
      {/** TODO: Make the image link to the URL */}
      <img className='image' src={url} />
      {/** Need to override Grid's default width setting of 100% */}
      <Grid container spacing={0} sx={{ width: 'auto' }}>
        {palettes.map((palette: string, index: number) => (
          <Grid key={`${palette}-${index}`} item>
            <Paper
              sx={{
                height: '100%',
                position: 'relative',
                width: 80,
                backgroundColor: palette,
                borderRadius: 0,
                border: '1px solid #4b4e6d',
              }}
            >
              <PaletteButton palette={palette} />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <StyledIconButton onClick={() => handleDelete(index)}>
        <HighlightOffIcon />
      </StyledIconButton>
    </Container>
  );
}

export default ColorPaletteContainer;
