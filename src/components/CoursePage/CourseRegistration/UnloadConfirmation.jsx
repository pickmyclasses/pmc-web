import { PreventableNavigationContext } from '../../PreventableNavigation/ContainerWithPreventableNavigation';
import React, { useContext, useEffect } from 'react';

/**
 * If `when` is true, makes the browser prompt when the user tries to leave the current page.
 */
export default function UnloadConfirmation({
  when = false,
  navigationPreventionKey = 'default',
  onNavigationPrevented = () => {},
}) {
  const { preventNavigation, allowNavigation } = useContext(PreventableNavigationContext);

  useEffect(() => {
    if (!when) return;

    const oldBeforeUnloadHandler = window.onbeforeunload;
    window.onbeforeunload = (...args) => {
      oldBeforeUnloadHandler?.(...args);
      onNavigationPrevented(navigationPreventionKey);
      return true;
    };

    preventNavigation(navigationPreventionKey, () =>
      onNavigationPrevented(navigationPreventionKey)
    );

    return () => {
      window.onbeforeunload = oldBeforeUnloadHandler;
      allowNavigation(navigationPreventionKey);
    };
  }, [
    preventNavigation,
    allowNavigation,
    when,
    navigationPreventionKey,
    onNavigationPrevented,
  ]);

  return <></>;
}
