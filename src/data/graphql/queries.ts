import { gql } from "@apollo/client";

export const LIST_TODOS = gql`
query GetTodos {
  todos {
    id
    title
    done
  }
}
`