import React, { useContext, forwardRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PreventableNavigationContext } from '../PreventableNavigation/ContainerWithPreventableNavigation';
import PreventableLink from '../PreventableNavigation/PreventableLink';

/**
 * A link to the auth form that lets the auth form know to route back to where the user came
 * from.
 */
const LinkToAuthForm = forwardRef(({ onClick, ...props }, ref) => {
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);
  const { pathname } = useLocation();

  const [authFormShouldLinkTo, setAuthFormShouldLinkTo] = useState('/');

  useEffect(
    () => setAuthFormShouldLinkTo(locationsToExclude.includes(pathname) ? '/' : pathname),
    [pathname]
  );

  return (
    <PreventableLink
      to='#'
      ref={ref}
      onClick={(e) => {
        onClick?.(e);
        e.preventDefault();
        navigateIfAllowed('/auth', null, { state: { linkTo: authFormShouldLinkTo } });
      }}
      {...props}
    />
  );
});

export default LinkToAuthForm;

/**
 * If the user came from one of these locations, the auth form should link to the home
 * page instead of where they came from.
 */
const locationsToExclude = ['/auth', '/register'];
