import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "@/data/graphql/mutations";
import { LIST_TODOS } from "@/data/graphql/queries";
import { ITodo } from "@/data/models/todo";
import { Authentication } from "@/domain/usecases";
import { Header } from "@/presentation/components";
import { Validation } from "@/presentation/protocols";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Center,
  Checkbox,
  FlatList,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useEffect, useState } from "react";

interface Props {
  validation: Validation;
  authentication: Authentication;
}

const TodoManagement: React.FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    title: "",
    titleError: null,
  });

  const { data } = useQuery<{ todos: ITodo[] }>(LIST_TODOS);

  const [createTodo, { loading: isCreating }] = useMutation(CREATE_TODO, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  title
                  done
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache, { data: { deleteTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = [], { readField }) {
            return existingTodos.filter(
              (todoRef) => deleteTodo.id !== readField("id", todoRef)
            );
          },
        },
      });
    },
  });

  const [updateTodo] = useMutation(UPDATE_TODO);

  useEffect(() => {
    validate("title");
  }, [state.title]);

  const validate = (field: string): void => {
    if (state[`${field}Error`] === null) return;
    const { title } = state;
    const formData = { title };
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));
  };

  const addItem = async () => {
    if (!!state.titleError) return;

    await createTodo({
      variables: { createTodoInput: { title: state.title } },
    });
  };

  const handleDelete = async (id: number) => {
    await deleteTodo({
      variables: { id },
    });
  };

  const handleStatusChange = async (item) => {
    await updateTodo({
      variables: { updateTodoInput: { id: item.id, done: !item.done } },
    });
  };

  return (
    <Center safeArea flex={1}>
      <VStack space={4} flex={1} w="90%" mt={4}>
        <Header authentication={authentication} />
        <FormControl isRequired isInvalid={!!state.titleError}>
          <Input
            variant="filled"
            InputRightElement={
              isCreating ? (
                <Spinner accessibilityLabel="Loading creation" />
              ) : (
                <IconButton
                  icon={<Icon as={FontAwesome5} name="plus" size={4} />}
                  colorScheme="emerald"
                  ml={1}
                  onPress={() => {
                    addItem();
                    setState((p) => ({ ...p, title: "", titleError: null }));
                  }}
                  mr={1}
                />
              )
            }
            onChangeText={(v) =>
              setState((p) => ({ ...p, title: v, titleError: "" }))
            }
            value={state.title}
            placeholder="Add Item"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {state.titleError}
          </FormControl.ErrorMessage>
        </FormControl>
        <VStack>
          <FlatList
            data={data?.todos}
            renderItem={({ item, index }) => {
              return (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={item.id + index}
                >
                  <Checkbox
                    colorScheme="emerald"
                    isChecked={item.done}
                    onChange={() => handleStatusChange(item)}
                    value={item.title}
                  >
                    <Text mx={2} strikeThrough={item.done}>
                      {item.title}
                    </Text>
                  </Checkbox>
                  <IconButton
                    colorScheme="emerald"
                    icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                    onPress={() => handleDelete(item.id)}
                  />
                </HStack>
              );
            }}
          />
        </VStack>
      </VStack>
    </Center>
  );
};

export default TodoManagement;
