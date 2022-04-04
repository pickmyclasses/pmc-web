import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import StaticTimeDataCardContent from './TimeDataCard/StaticTimeDataCardContent';
import EditableTimeDataCardContent from './TimeDataCard/EditableTimeDataCardContent';

const TimeDataCard = forwardRef(
  ({ isEditable = false, onIsEditableChange = () => {}, ...props }, ref) => {
    const { groupID, color } = props.data;

    const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

    // Scroll the card into view on first render.

    const scrollCardIntoView = useCallback(
      () => ref?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }),
      [ref]
    );

    useEffect(() => {
      if (!hasScrolledIntoView && ref?.current) {
        scrollCardIntoView();
        setHasScrolledIntoView(true);
      }
    }, [hasScrolledIntoView, ref, scrollCardIntoView]);

    useEffect(() => scrollCardIntoView(), [groupID, scrollCardIntoView]);

    return (
      <Card
        ref={ref}
        sx={{
          position: 'relative',
          minWidth: '288px',
          maxWidth: '360px',
          borderTop: '8px solid ' + color,
          marginBottom: '8px',
          boxShadow: isEditable ? 6 : 3,
        }}
      >
        {isEditable ? (
          <EditableTimeDataCardContent
            {...props}
            onIsEditableChange={onIsEditableChange}
            scrollCardIntoView={scrollCardIntoView}
          />
        ) : (
          <StaticTimeDataCardContent
            {...props}
            onEditButtonClick={() => onIsEditableChange?.(true)}
          />
        )}
      </Card>
    );
  }
);

export default TimeDataCard;
