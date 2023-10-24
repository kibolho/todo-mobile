import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      title
      done
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $updateTodoInput) {
      id
      title
      done
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      username
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($signinUserInput: SigninUserInput!) {
    signin(signinUserInput: $signinUserInput) {
      username
      access_token
    }
  }
`;
