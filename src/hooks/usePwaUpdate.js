import { useCallback, useEffect, useRef, useState } from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

export function usePwaUpdate() {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const registrationRef = useRef(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        registrationRef.current = registration;
        setNeedsUpdate(true);
      },
    });

    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration?.waiting) {
        registrationRef.current = registration;
        setNeedsUpdate(true);
      }
    });
  }, []);

  const refresh = useCallback(() => {
    const registration = registrationRef.current;
    if (!registration?.waiting) {
      return;
    }

    const onControllerChange = () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        onControllerChange
      );
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      onControllerChange
    );
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }, []);

  return { needsUpdate, refresh };
}
