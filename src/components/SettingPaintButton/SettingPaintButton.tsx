import clsx from 'clsx';
import { memo, useState } from 'react';

import styles from './SettingPaintButton.module.scss';

import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import SettingIcon from '@/assets/icons/SettingIcon';

interface ISettingPaintButtonProps {
  theme: theme;
  onEdit: () => void;
  onDelete?: () => void;
  onSetMainPaint?: () => void;
}

const SettingPaintButton = memo(
  ({ theme, onEdit, onDelete, onSetMainPaint }: ISettingPaintButtonProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Button
            variant="icon"
            theme={theme}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <SettingIcon />
          </Button>
        </div>
        {isSettingsOpen && (
          <div
            className={clsx(
              styles.settingsMenu,
              styles[`settingsMenu--${theme}`]
            )}
          >
            <button
              type="button"
              className={clsx(
                styles.setCoverButton,
                styles[`setCoverButton--${theme}`]
              )}
              onClick={onSetMainPaint}
            >
              Set the cover
            </button>
            <button
              type="button"
              className={clsx(styles.buttons, styles[`buttons--${theme}`])}
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className={clsx(styles.buttons, styles[`buttons--${theme}`])}
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default SettingPaintButton;
