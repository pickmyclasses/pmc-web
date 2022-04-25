import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import NoData from './../../assets/NoData.png';

// Inform the user to write review
export default function ReviewNotAvailable() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h2' gutterBottom component='div'>
        Stats Not Available
      </Typography>

      <Box
        component='img'
        sx={{
          marginTop: '-10%',
          height: 800,
          width: 800,
          maxHeight: { xs: 100, md: 800 },
          maxWidth: { xs: 100, md: 800 },
        }}
        alt='No Statistics Available'
        src={NoData}
      />
    </div>
  );
}
