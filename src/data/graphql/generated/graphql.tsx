import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTodoInput = {
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todos;
  deleteTodo: Todos;
  signin: SigninResponse;
  signup: SignupResponse;
  updateTodo: Todos;
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSigninArgs = {
  signinUserInput: SigninUserInput;
};


export type MutationSignupArgs = {
  signupUserInput: SignupUserInput;
};


export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  getAllTodos: Array<Todos>;
  getTodo: Todos;
};


export type QueryGetTodoArgs = {
  id: Scalars['ID']['input'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  access_token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SigninUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  username: Scalars['String']['output'];
};

export type SignupUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateTodoInput = {
  done: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Todos = {
  __typename?: 'todos';
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'user';
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  todos: Array<Todos>;
  username: Scalars['String']['output'];
};
