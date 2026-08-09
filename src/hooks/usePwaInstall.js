import { useCallback, useEffect, useState } from 'react';

const DISMISS_KEY = 'pwaInstallDismissedAt';
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  return (
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
    !window.MSStream
  );
}

function isDismissed() {
  const dismissedAt = Number(localStorage.getItem(DISMISS_KEY));
  if (!dismissedAt) {
    return false;
  }
  return Date.now() - dismissedAt < DISMISS_DURATION_MS;
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(isStandalone);
  const [dismissed, setDismissed] = useState(isDismissed);
  const [iosDevice] = useState(isIos);

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const canShowBanner =
    !isInstalled &&
    !dismissed &&
    (deferredPrompt !== null || iosDevice);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) {
      return;
    }
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setDismissed(true);
  }, []);

  return {
    canShowBanner,
    canPromptInstall: deferredPrompt !== null,
    iosDevice,
    promptInstall,
    dismiss,
  };
}
