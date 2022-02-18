import React from 'react';
import { Box, Card, CircularProgress, Divider, Typography } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import ShoppingCart from './ShoppingCart';
import RequirementList from './RequirementList';

/**
 * The scheduler panel, which includes the shopping cart and the requirement list.
 */
export default function Scheduler({
  isLoading = false,
  classesInShoppingCart = [],
  requirements = [],
}) {
  const renderLoadingIndication = () => <CircularProgress sx={{ margin: 'auto' }} />;

  const renderSchedulerContent = () => (
    <>
      <Box flex={1}>
        <ShoppingCart classes={classesInShoppingCart} />
      </Box>
      <Divider sx={{ margin: '16px 0' }} />
      <div style={{ marginBottom: '16px' }}>Requirements</div>
      <RequirementList requirements={requirements} />
    </>
  );

  return (
    <Card sx={{ height: '100%', overflow: 'visible' }}>
      <Box padding='24px' height='calc(100% - 48px)' display='flex' flexDirection='column'>
        <Box display='flex' alignItems='center' marginBottom='16px'>
          <ShoppingCartIcon color='action' fontSize='small' />
          <Typography variant='overline' marginLeft='8px'>
            Shopping Cart
          </Typography>
        </Box>
        {isLoading ? renderLoadingIndication() : renderSchedulerContent()}
      </Box>
    </Card>
  );
}
