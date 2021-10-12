import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    languageId: String!
  }

  type Language {
    id: ID!
    langId: String!
    name: String!
  }

  type Query {
    words(languageId: String): [Word!]!
    languages: [Language!]!
    randomWord: Word!
    doWordExist: Boolean!
  }
`;
