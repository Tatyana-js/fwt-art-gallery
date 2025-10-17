import { FC } from 'react';

import type { theme } from '@/types/types.ts';

interface IAddArtistModal {
  theme: theme;
}

const AddArtistModal: FC<IAddArtistModal> = ({ theme }) => {
  return <div>{theme}</div>;
};

export default AddArtistModal;
