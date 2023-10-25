import { Validation } from "@/presentation/protocols";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Pressable,
  WarningOutlineIcon,
  Icon,
  Toast,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useSession } from "@/presentation/hooks/use-session";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "@/data/graphql/mutations";
import { Linking, TouchableOpacity } from "react-native";
import { Mutation } from "@/data/graphql/generated/graphql";

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    email: "",
    emailError: null,
    password: "",
    passwordError: null,
    passwordShow: false,
    isLoading: false,
    isFormInvalid: false,
  });

  const [signIn] = useMutation<Pick<Mutation,"signin">>(SIGN_IN);

  const { setCurrentAccount } = useSession();

  const handleLogin = async () => {
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState((old) => ({
        ...old,
        isLoading: true,
      }));
      const account = await signIn({
        variables: {
          signinUserInput: {
            username: state.email,
            password: state.password,
          },
        },
      });
      setCurrentAccount(account.data.signin);
      router.replace("/(app)");
    } catch (error) {
      Toast.show({
        title: "Ops!",
        description: error.message,
        duration: 5000,
      });
      setState((old) => ({
        ...old,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    validate("email");
  }, [state.email]);

  useEffect(() => {
    validate("password");
  }, [state.password]);

  const validate = (field: string): void => {
    if (state[`${field}Error`] === null) return;
    const { email, password } = state;
    const formData = { email, password };
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.emailError || !!old.passwordError,
    }));
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Todo App
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={!!state.emailError}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              testID="email-input"
              placeholder="example@domain.com"
              _input={{
                keyboardType: "email-address",
                autoCapitalize: "none",
              }}
              value={state.email}
              onChangeText={(email) =>
                setState((p) => ({ ...p, email, emailError: "" }))
              }
            />
            <FormControl.ErrorMessage
              testID="email-error"
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {state.emailError}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!state.passwordError}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              testID="password-input"
              value={state.password}
              onChangeText={(password) =>
                setState((p) => ({ ...p, password, passwordError: "" }))
              }
              type={state.passwordShow ? "text" : "password"}
              InputRightElement={
                <Pressable
                  onPress={() =>
                    setState((p) => ({ ...p, passwordShow: !p.passwordShow }))
                  }
                >
                  <Icon
                    as={
                      <Entypo
                        name={state.passwordShow ? "eye" : "eye-with-line"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
            />
            <FormControl.ErrorMessage
              testID="password-error"
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {state.passwordError}
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "emerald.400",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            testID="submit-login"
            isLoading={state.isLoading}
            mt="2"
            colorScheme="emerald"
            onPress={handleLogin}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("sign-up");
              }}
            >
              <Text color={"emerald.400"} fontWeight={"medium"} fontSize={"sm"}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
