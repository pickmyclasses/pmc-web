import MuiTypography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import RateReviewIcon from '@mui/icons-material/RateReview';

// Review Description
export default function ReviewDescription({ course }) {
  return (
    <Stack direction='row' spacing={2}>
      <MuiTypography variant='h6' gutterBottom>
        REVIEW
        <RateReviewIcon />
      </MuiTypography>
    </Stack>
  );
}
