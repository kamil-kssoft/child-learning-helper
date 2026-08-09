import { Navigate, useSearchParams, Link } from 'react-router-dom';
import { useLocale, useT } from '../i18n/LocaleContext';
import { LOCALE_META } from '../i18n/locales';
import {
  BASIC_WORD_LEVELS,
  WORDS_PER_LEVEL,
  isValidBasicWordsDir,
  getLevelProgressKey,
} from '../config/basicWords';
import { useLearningProgress } from '../hooks/useLearningProgress';
import BackButton from './BackButton';
import ProgressBar from './ProgressBar';
import './Menu.css';
import './ProgressBar.css';
import './BasicWords.css';

function BasicWordsLevels() {
  const t = useT();
  const { locale } = useLocale();
  const [searchParams] = useSearchParams();
  const dir = searchParams.get('dir') || '';
  const randomize = searchParams.get('randomize') === '1';
  const { getCompletedCount } = useLearningProgress();

  const foreignMeta = LOCALE_META[locale];
  const foreignLabel = foreignMeta?.label || locale;

  const directionTitle =
    dir === `pl-to-${locale}`
      ? t('basicWords.direction.plToForeign', { lang: foreignLabel })
      : t('basicWords.direction.foreignToPl', { lang: foreignLabel });

  if (locale === 'pl' || !isValidBasicWordsDir(dir, locale)) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="menu-container">
      <BackButton />
      <div className="basic-words-levels">
        <h1 className="basic-words-levels-title">{directionTitle}</h1>
        {BASIC_WORD_LEVELS.map(({ level, themeKey }) => {
          const progressKey = getLevelProgressKey(dir, level);
          const completed = getCompletedCount(progressKey);
          const theme = t(themeKey);
          const learnUrl = `/basic-words?dir=${dir}&level=${level}&randomize=${randomize ? 1 : 0}`;

          return (
            <Link key={level} to={learnUrl} className="basic-words-level-item">
              <div className="basic-words-level-content">
                <span className="basic-words-level-label">
                  {t('basicWords.levelTitle', { level, theme })}
                </span>
                <ProgressBar
                  value={completed}
                  max={WORDS_PER_LEVEL}
                  label={t('progress.category', {
                    completed,
                    total: WORDS_PER_LEVEL,
                  })}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BasicWordsLevels;
