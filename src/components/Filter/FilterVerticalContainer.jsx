import React, { useState, createContext } from 'react';
import FilterGroup from './FilterGroup';

/**
 * This is a container that holds the checkboxes for the filter
 * This port will only be shown when the screen size is big enough
 */
export const userSelectionContext = createContext();

export default function FilterVerticalContainer() {
  const [selection, setSelection] = useState([]);

  return (
    <userSelectionContext.Provider value={{ selection, setSelection }}>
      <FilterGroup />
    </userSelectionContext.Provider>
  );
}
