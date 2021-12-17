import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .matches(/^[ A-Za-z0-9_@./#&+-]*$/i, 'Username contains invalid characters')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be at least 5 characters')
    .max(20, 'Must be no longer than 20 characters')
    .matches(/^[ A-Za-z0-9_@!$./#&+-]*$/i, 'Password contains invalid characters')
    .required('Required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
});

const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayer($username: String!, $password: String!) {
    createPlayer(username: $username, password: $password) {
      token
    }
  }
`;

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


  // TODO: fix the align items styles
  return (
    <KeyboardAwareScrollView
      behavior="padding"
      // style={styles.signUpContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{'Sign Up'}</Text>
        <Text style={styles.subtitle}>{'Create an account an start playing!'}</Text>
      </View>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirm: ''
        }}
        validateOnChange
        validateOnBlur
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
              <Text>{'Password Confirmation'}</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
                secureTextEntry
              />
              {errors.passwordConfirm && touched.passwordConfirm ? <Text style={styles.inputError}>{errors.passwordConfirm}</Text> : null}
            </View>
            <TouchableOpacity
              disabled={!Object.keys(touched).length || Object.keys(errors).length}
              style={getSubmitButtonStyles(SignupSchema, values, touched)}
              type="submit"
              onPress={handleSubmit}
            >
              {/* todo: change this after get it working properly */}
              {!Object.keys(touched).length || Object.keys(errors).length
                ? <Text>{'Disabled'}</Text>
                : <Text>{'Create Account'}</Text>
              }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};


const getSubmitButtonStyles = (errors) => {
  const buttonStyles = {
    backgroundColor: "#841584",
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    color: 'blue'
  };

  if (Object.keys(errors).length) {
    buttonStyles.backgroundColor = 'gray';
  }

  return buttonStyles;
};

const styles = StyleSheet.create({
  signUpContainer: {
    // alignItems: 'center'
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
  }
});

export default SignUp;
