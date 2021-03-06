import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import { logInFetch, authenticateUser } from '../../utils/authentication-service';
import { AppContext } from '../../utils/context';

const { height } = Dimensions.get('window');

const LogInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .matches(/^[ A-Za-z0-9_@./#&+-]*$/i, 'Username contains invalid characters')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be at least 5 characters')
    .max(20, 'Must be no longer than 20 characters')
    .matches(/^[ A-Za-z0-9_@!$./#&+-]*$/i, 'Password contains invalid characters')
    .required('Required')
});


const LogIn = () => {
  const navigation = useNavigation();
  const { setAccessToken, setUsername, setPlayerId } = useContext(AppContext);
  const [error, setError] = useState(null);

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.LogInContainer}
      scrollEnabled={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{'Player Login'}</Text>
        <Text style={styles.subtitle}>{"Let's get you going."}</Text>
      </View>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validateOnChange
        validateOnBlur
        validationSchema={LogInSchema}
        onSubmit={async ({username, password}, actions) => {
          const token = await logInFetch(username, password);
      
          if (token) {
            await authenticateUser(token, setAccessToken, setUsername, setPlayerId);
            actions.setSubmitting(false);      
          } else {
            setError('Something went wrong.');
          }
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
              {errors.username && touched.username ? (<Text style={styles.textError}>{errors.username}</Text>) : null}
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
              {errors.password && touched.password ? (<Text style={styles.textError}>{errors.password}</Text>) : null}
            </View>
            <View style={styles.serverError}>
              {error ? <Text style={styles.textError}>{'Something went wrong. Check username and password'}</Text> : null}
            </View>
            <View style={styles.submitContainer}>
              <TouchableOpacity
                disabled={isSubmitting || !Object.keys(touched).length || Object.keys(errors).length}
                style={getSubmitButtonStyles(touched, errors, isSubmitting)}
                type="submit"
                onPress={handleSubmit}
              >
                {
                  isSubmitting
                    ? <ActivityIndicator color={'white'} />
                    : <Text style={styles.buttonText}>{'Login'}</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <View style={styles.loginLinkContainer}>
        <Text>
          {"Not registered? "}
          <Text
            onPress={goToSignUp}
            style={styles.linkText}
          >
            {'Create an account.'}
          </Text>
        </Text>
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
  LogInContainer: {
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
    color: 'red',
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
    height: 80
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    width: '100%',
    padding: Platform.OS === 'android' ? 10 : 16
  },
  textError: {
    color: 'red'
  },
  serverError: {
    height: 20
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white'
  },
  loginLinkContainer: {
    marginTop: 50
  },
  linkText: {color: 'red'}
});

export default LogIn;
