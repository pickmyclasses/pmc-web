import React, { forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PreventableNavigationContext } from './ContainerWithPreventableNavigation';

const PreventableLink = forwardRef(({ onClick, ...props }, ref) => {
  const { isNavigationAllowed, navigateIfAllowed } = useContext(PreventableNavigationContext);

  return (
    <Link
      ref={ref}
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
});

export default PreventableLink;
