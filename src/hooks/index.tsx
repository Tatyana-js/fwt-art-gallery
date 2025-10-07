import { use } from 'react';

import { IThemeContext, ThemeContext } from '../Context/context';

const useTheme = (): IThemeContext => use(ThemeContext);

export default useTheme;
