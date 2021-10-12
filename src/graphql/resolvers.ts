import Language from '../models/Language';
import Word from '../models/Word';

export const resolvers = {
  Query: {
    languages: async (): Promise<string> => {
      return await Language.find();
    },
    words: async (_root: undefined, {languageId}: {languageId: string}): Promise<string> => {
      return await Word.find({ languageId });
    },
  },
};
