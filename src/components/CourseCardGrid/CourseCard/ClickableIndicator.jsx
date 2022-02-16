import React from 'react';
import { ChevronRight } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ClickableIndicator({
  children,
  propagate = false,
  onClick = () => {},
}) {
  return (
    <motion.div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
      initial={propagate ? undefined : 'initial'}
      whileHover={propagate ? undefined : 'mouseEntered'}
    >
      {children}
      <MotionChevronRight
        color='action'
        variants={{ initial: { opacity: 0 }, mouseEntered: { opacity: 1 } }}
        transition={{ type: 'join' }}
      />
    </motion.div>
  );
}

const MotionChevronRight = motion(ChevronRight);
