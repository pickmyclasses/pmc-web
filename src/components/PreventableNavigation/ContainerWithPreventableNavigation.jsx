import React, { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContainerWithPreventableNavigation({ children }) {
  const [preventionKeys, setPreventionKeys] = useState([]);
  const navigate = useNavigate();

  const preventNavigation = useCallback(
    (key, onPrevented) => {
      if (!preventionKeys.find((x) => x.key === key)) {
        setPreventionKeys(preventionKeys.concat({ key, onPrevented }));
      }
    },
    // eslint-disable-next-line
    []
  );

  const allowNavigation = useCallback(
    (key) => setPreventionKeys(preventionKeys.concat().filter((x) => x.key !== key)),
    // eslint-disable-next-line
    []
  );

  const navigateIfAllowed = useCallback(
    (to, onPrevented, ...args) => {
      if (preventionKeys.length) {
        for (let x of preventionKeys) x.onPrevented?.(preventionKeys);
        onPrevented?.(preventionKeys);
        return;
      }
      navigate(to, ...args);
    },
    [preventionKeys]
  );

  return (
    <PreventableNavigationContext.Provider
      value={{
        isNavigationAllowed: !preventionKeys.length,
        navigateIfAllowed,
        preventNavigation,
        allowNavigation,
      }}
    >
      {children}
    </PreventableNavigationContext.Provider>
  );
}

/**
 * @type {React.Context<{
 *   isNavigationAllowed: Boolean,
 *   navigateIfAllowed: function(String, function(Array<String>): void, ...): void,
 *   preventNavigation: function(String, function(Array<String>): void): void,
 *   allowNavigation: function(String): void,
 * }>}
 *
 * `navigateIfAllowed(to, onPrevented, ...args)`: Navigates to the relative link `to` if
 *     no prevention key is currently applied. Otherwise, calls `onPrevented` with the
 *     prevention keys currently applied. Passes `args` as the second argument onward into the
 *     react-router-dom's `navigate` method.
 *
 * `preventNavigation(key, onPrevented)`: Prevents navigation temporarily due to some `key`.
 *     All navigation attempted with `navigateIfAllowed` will be prevented until this `key` and
 *     all other prevention keys are lifted with `allowNavigation`. Calls `onPrevented` whenever
 *     a navigation happens with the current `key` applied.
 *
 * `allowNavigation(key)`: Lifts a prevention key.
 */
export const PreventableNavigationContext = createContext();
