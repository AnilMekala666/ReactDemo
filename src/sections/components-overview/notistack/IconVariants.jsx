import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

// third-party
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

// project import
import MainCard from 'components/MainCard';
import { handlerIconVariants } from 'api/snackbar';

// assets
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';

// ==============================|| NOTISTACK - CUSTOM ICON ||============================== //

export default function IconVariants() {
  const [value, setValue] = useState('usedefault');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const NotiStackIconVariantsSnackbarCodeString = `<Button
variant="contained"
fullWidth
sx={{ marginBlockStart: 2 }}
onClick={() => {
  enqueueSnackbar('Your notification here', { variant: 'info' });
  handlerIconVariants(value);
}}
>
  Show Snackbar
</Button>`;

  return (
    <MainCard title="With Icons" codeString={NotiStackIconVariantsSnackbarCodeString}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          value={value}
          onChange={handleChange}
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="usedefault" control={<Radio />} label="Use Default" />
          <FormControlLabel value="useemojis" control={<Radio />} label="Use Emojis" />
          <FormControlLabel value="hide" control={<Radio />} label="Hide" />
        </RadioGroup>
      </FormControl>
      <SnackbarProvider
        iconVariant={value === 'usedefault' ? { info: <InfoCircleOutlined style={{ marginRight: 8 }} /> } : undefined}
        hideIconVariant={value === 'hide'}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{ marginBlockStart: 2 }}
          onClick={() => {
            enqueueSnackbar('Your notification here', { variant: 'info' });
            handlerIconVariants(value);
          }}
        >
          Show Snackbar
        </Button>
      </SnackbarProvider>
    </MainCard>
  );
}
