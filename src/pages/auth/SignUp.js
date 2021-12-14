import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .matches(/^[ A-Za-z0-9_@./#&+-]*$/i, 'Username contains invalid characters')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .matches(/^[ A-Za-z0-9_@./#&+-]*$/i, 'Username contains invalid characters')
    .required('Required'),
  passwordValidator: Yup.string().required()
});

const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayer($username: String!, $password: String!) {
    createPlayer(username: $username, password: $password) {
      token
    }
  }
`;

const passwordsMatch = (touched, values) => {
  if (touched.passwordValidator && values.password && values.passwordValidator) {
    return values.passwordValidator === values.password;
  }

  return true;
};

// TODO: make the button disabled if not all fields valid or loading
// TODO: keyboard aware scrollview & hide the header on this screen

const hasValues = (values) => {
  let hasSome = false;

  Object.keys(values).forEach((key) => {
    if (values[key]) {
      hasSome = true;
    }
  });

  return hasSome;
};

const SignUp = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_PLAYER_MUTATION);

  if (loading) return (<View><Text>{'Submitting...'}</Text></View>);
  if (error) {
    return (<View><Text>{'an error occurred...'}</Text></View>);
  }

  if (data && data.createPlayer) {
    // TODO: store the token somewhere, redux? context? some sort of local storage?
    return <View><Text>{JSON.stringify(data.createPlayer)}</Text></View>
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      // keyboardVerticalOffset = {80}
      style={styles.signUpContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{'Sign Up'}</Text>
        <Text style={styles.subtitle}>{'Create an account an start playing!'}</Text>
      </View>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordValidator: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={({ username, password }) => {
          mutate({
            variables: {
              username,
              password
            }
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text>{'Username'}</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && touched.username ? (<Text style={styles.inputError}>{errors.username}</Text>) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text>{'Password'}</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password ? (<Text style={styles.inputError}>{errors.password}</Text>) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text>{'Re-enter Password'}</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('passwordValidator')}
                onBlur={handleBlur('passwordValidator')}
                value={values.passwordValidator}
                secureTextEntry
              />
              {
                errors.passwordValidator && touched.passwordValidator || !passwordsMatch(touched, values)
                  ? (<Text style={styles.inputError}>{'Passwords do not match!'}</Text>)
                  : null
              }
              {hasValues(values) ? <Text>{JSON.stringify(values)}</Text> : null}
              {!passwordsMatch(touched, values) ? <Text>{'passwords dont match'}</Text> : null}
            </View>
            <TouchableOpacity
              disabled={!hasValues(values) && Object.keys(errors).length || !passwordsMatch(touched, values)}
              style={[styles.submitButton]}
              type="submit"
              onPress={handleSubmit}
            >
              <Text>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    marginTop: 100 // TODO: calculate this, maybe 1/3 page down
  },
  title: {
    fontSize: 32,
    color: 'red', // unsure of colors and styles for now
    fontWeight: '500',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 28
  },
  formContainer: {
    width: '80%'
  },
  inputContainer: {
    marginBottom: 20,
    height: 80
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    width: '100%',
    paddingHorizontal: 10
  },
  inputError: {
    color: 'red'
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  submitButton: {
    backgroundColor: "#841584",
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150
  },
  submitButtonText: {
    color: '#FFFFFF'
  }
});

export default SignUp;
