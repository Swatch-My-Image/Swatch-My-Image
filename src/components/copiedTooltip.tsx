import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import copy from 'clipboard-copy';
import { InvisibleButton } from './customMuiStyle';

const DEFAULT_MESSAGE: string = 'Click to copy to Clipboard.';

function PaletteButton({ palette }: { palette: string }): JSX.Element {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const handlePaletteClick = (content: string): void => {
    copy(content);
    setMessage('Copied!');
  };

  const handleTooltipClose = (): void => {
    // Avoid re-rendering the tooltip in UI
    setTimeout(() => setMessage(DEFAULT_MESSAGE), 1000);
  };

  return (
    <Tooltip
      title={message}
      onClose={handleTooltipClose}
      onClick={() => handlePaletteClick(palette)}
    >
      <InvisibleButton>{palette}</InvisibleButton>
    </Tooltip>
  );
}

export default PaletteButton;
