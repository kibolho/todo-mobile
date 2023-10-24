import { gql } from "@apollo/client";

export const LIST_TODOS = gql`
  query GetTodos {
    getAllTodos {
      id
      title
      done
    }
  }
`;
