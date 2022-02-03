import MuiTypography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function ReviewDescription({ course }) {
  return (
    <Stack direction='row' spacing={2}>
      <MuiTypography variant='h6' gutterBottom>
        REVIEW
        <RateReviewIcon />
      </MuiTypography>
      <Link to={`/course/${course['ID']}`} style={{ textDecoration: 'none' }}>
        <Button variant='outlined' color='primary' startIcon={<KeyboardReturnIcon />}>
          {`${course['CatalogCourseName']} — ${course['Title']}`}
        </Button>
      </Link>
    </Stack>
  );
}
