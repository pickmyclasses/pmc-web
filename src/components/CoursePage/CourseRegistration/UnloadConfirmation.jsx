import React, { useEffect } from 'react';
import { Prompt } from 'react-router-dom';

/**
 * If `when` is true, makes the browser prompt when the user tries to leave the current page.
 * `message` does not work for reloading or closing the tab.
 */
export default function UnloadConfirmation({ when = false, message = null }) {
  useEffect(() => {
    if (!when) return;

    const oldBeforeUnloadHandler = window.onbeforeunload;
    window.onbeforeunload = (...args) => {
      oldBeforeUnloadHandler?.(...args);
      return true;
    };

    return () => (window.onbeforeunload = oldBeforeUnloadHandler);
  }, [when]);

  return <Prompt when={when} message={message} />;
}
