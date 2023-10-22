import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
  # Mutation to delete a todo
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const CREATE_TODO = gql`
  # Mutation to create a new todo
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      title
      done
    }
  }
`;

export const UPDATE_TODO = gql`
# Mutation to update a todo
mutation UpdateTodo($updateTodoInput: UpdateTodoInput) {
  updateTodo(updateTodoInput: $updateTodoInput) {
    id
    title
    done
  }
}
`