const STORAGE_KEY = 'learningProgress';
const PROGRESS_UPDATE_EVENT = 'learning-progress-update';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getProgressKey(pathname = window.location.pathname, search = window.location.search) {
  const params = new URLSearchParams(search);
  if (pathname === '/learn') {
    const start = params.get('start') || '0';
    const stop = params.get('stop') || '40';
    return `learn:${start}-${stop}`;
  }
  return pathname.replace(/^\//, '') || 'unknown';
}

function markItemComplete(progressKey, itemValue) {
  const data = loadProgress();
  const value = String(itemValue);
  const completed = data[progressKey] || [];

  if (!completed.includes(value)) {
    data[progressKey] = [...completed, value];
    saveProgress(data);
    window.dispatchEvent(new Event(PROGRESS_UPDATE_EVENT));
  }

  return data[progressKey].length;
}

function getCompletedCount(progressKey) {
  const data = loadProgress();
  return data[progressKey]?.length || 0;
}

function getProgressPercent(progressKey, totalItems) {
  if (!totalItems) return 0;
  return Math.min(100, (getCompletedCount(progressKey) / totalItems) * 100);
}

export {
  STORAGE_KEY,
  PROGRESS_UPDATE_EVENT,
  loadProgress,
  getProgressKey,
  markItemComplete,
  getCompletedCount,
  getProgressPercent,
};
