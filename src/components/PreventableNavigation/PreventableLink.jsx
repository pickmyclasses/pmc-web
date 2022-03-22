import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PreventableNavigationContext } from './ContainerWithPreventableNavigation';

export default function PreventableLink({ onClick, ...props }) {
  const { isNavigationAllowed, navigateIfAllowed } = useContext(PreventableNavigationContext);

  return (
    <Link
      onClick={(e) => {
        onClick?.(e);
        if (!isNavigationAllowed) {
          navigateIfAllowed('#'); // let fail
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
}
