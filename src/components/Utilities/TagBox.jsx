import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Typography } from '@mui/material';

// project imports

// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// ===============================|| COLOR BOX ||=============================== //

const TagBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 1 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 0.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff',
        }}
      >
        {title && (
          <Typography variant='subtitle1' color='inherit'>
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 2 }} />}
      </Box>
    </Card>
  </>
);

TagBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};
export default TagBox;
