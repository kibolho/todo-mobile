import { Mutation, Query } from "@/data/graphql/generated/graphql";
import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "@/data/graphql/mutations";
import { LIST_TODOS } from "@/data/graphql/queries";
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
import { RefreshControl } from "react-native";

interface Props {
  validation: Validation;
}

const TodoManagement: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    title: "",
    titleError: null,
  });

  const {
    data,
    refetch: onRefreshTodos,
    loading,
  } = useQuery<Pick<Query, "getAllTodos">>(LIST_TODOS);

  const [createTodo, { loading: isCreating }] = useMutation<Pick<Mutation,"createTodo">>(CREATE_TODO, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          getAllTodos(existingTodos = []) {
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

  const [deleteTodo] = useMutation<Pick<Mutation,"deleteTodo">>(DELETE_TODO, {
    update(cache, { data: { deleteTodo } }) {
      cache.modify({
        fields: {
          getAllTodos(existingTodos = [], { readField }) {
            return existingTodos.filter(
              (todoRef) => deleteTodo.id !== readField("id", todoRef)
            );
          },
        },
      });
    },
  });

  const [updateTodo] = useMutation<Pick<Mutation,"updateTodo">>(UPDATE_TODO);

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

  const handleDelete = async (id: string) => {
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
        <Header />
        <FormControl isRequired isInvalid={!!state.titleError}>
          <Input
            variant="filled"
            InputRightElement={
              isCreating ? (
                <HStack justifyContent="center">
                  <Spinner
                    marginY={4}
                    mr={5}
                    size={5}
                    accessibilityLabel="Loading creation"
                  />
                </HStack>
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
        <VStack flex={1}>
          <FlatList
            data={data?.getAllTodos}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefreshTodos} />
            }
            ListEmptyComponent={() => {
              return (
                <HStack justifyContent="center" alignItems="center">
                  <Text
                    textAlign="left"
                    mx="2"
                    _light={{
                      color: "coolGray.800",
                    }}
                    _dark={{
                      color: "coolGray.50",
                    }}
                  >
                    No todo added
                  </Text>
                </HStack>
              );
            }}
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
