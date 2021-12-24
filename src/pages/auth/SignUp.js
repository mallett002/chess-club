import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {storeToken, getToken} from '../../utils/token-utils';

const {height} = Dimensions.get('window');

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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          color={'red'}
          size={'large'}
        />
      </View>
      );
  }

  if (error) {
    // Todo: make an error screen component
    return (<View><Text>{'an error occurred...'}</Text></View>);
  }

  if (data && data.createPlayer) {
    // TODO: use async-storage library. Already installed, ready to use.

    storeToken(data.createPlayer.token).then(() => getToken().then((t) => console.log(t)));
    // return <View><Text>{JSON.stringify(data.createPlayer.token)}</Text></View>
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.signUpContainer}
      scrollEnabled={false}
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
        onSubmit={({ username, password }, actions) => {
          mutate({
            variables: {
              username,
              password
            }
          });

          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text>{'Username'}</Text>
              <TextInput
                style={getInputStyles(errors.username, touched.username)}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && touched.username ? (<Text style={styles.inputError}>{errors.username}</Text>) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text>{'Password'}</Text>
              <TextInput
                style={getInputStyles(errors.password, touched.password)}
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
                style={getInputStyles(errors.passwordConfirm, touched.passwordConfirm)}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
                secureTextEntry
              />
              {errors.passwordConfirm && touched.passwordConfirm ? <Text style={styles.inputError}>{errors.passwordConfirm}</Text> : null}
            </View>
            <TouchableOpacity
              disabled={isSubmitting || !Object.keys(touched).length || Object.keys(errors).length}
              style={[styles.submitContainer, getSubmitButtonStyles(touched, errors, isSubmitting)]}
              type="submit"
              onPress={handleSubmit}
            >
              {
                isSubmitting
                  ? <ActivityIndicator color={'white'} />
                  : <Text style={styles.buttonText}>{'Create Account'}</Text>
              }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* Todo: Make this link active once login screen is done */}
      <View style={styles.loginLinkContainer}>
        <Text>{'Already have an account? Go to login.'}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};


const getSubmitButtonStyles = (touched, errors, isSubmitting) => {
  const buttonStyles = {
    backgroundColor: "red",
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    color: 'white'
  };

  if (isSubmitting || !Object.keys(touched).length || Object.keys(errors).length) {
    buttonStyles.backgroundColor = 'gray';
  }

  return buttonStyles;
};

const getInputStyles = (error, touched) => {
  const style = { ...styles.input };

  if (touched && error) {
    style.borderBottomColor = 'red';
  }

  return style;
};

const styles = StyleSheet.create({
  signUpContainer: {
    alignItems: 'center'
  },
  loader: {
    marginTop: height * 0.15
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.15
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
    width: '90%'
  },
  inputContainer: {
    marginBottom: 20,
    minHeight: 80
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    width: '100%',
    padding: Platform.OS === 'android' ? 10 : 16
  },
  inputError: {
    color: 'red'
  },
  submitContainer: {
    alignSelf: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white'
  },
  loginLinkContainer: {
    marginTop: 50
  }
});

export default SignUp;
