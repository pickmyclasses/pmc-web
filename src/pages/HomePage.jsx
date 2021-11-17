import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import ShoppingCart from '../components/ShoppingCart';
import { Box } from '@mui/system';

export default function HomePage() {
  const [shouldShowShoppingCart, setShouldShowShoppingCart] = useState(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs>
          <Button
            onClick={() => setShouldShowShoppingCart(!shouldShowShoppingCart)}
          >
            show/hide shopping cart
          </Button>
        </Grid>
        {shouldShowShoppingCart && (
          <Grid item xs={4}>
            <ShoppingCart></ShoppingCart>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
