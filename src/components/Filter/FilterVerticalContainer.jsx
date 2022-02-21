import React from 'react';
import FilterFormGroup from './FilterFormGroup';

/**
 * This is a container that holds the checkboxes for the filter
 * This port will only be shown when the screen size is big enough
 */
export default function FilterVerticalContainer() {
  return (
    <div
      style={{
        width: '20vw',
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <FilterFormGroup />
    </div>
  );
}
