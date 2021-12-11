import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
 
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  passwordValidator: Yup.string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
});

const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayer($username: String!, $password: String!) {
    createPlayer(username: $username, password: $password) {
      token
    }
  }
`;

const isEqual = (one, two) => one === two;

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
    <SafeAreaView style={styles.signUpContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Sign Up'}</Text>
        <Text style={styles.subtitle}>{'Create an account an start playing!'}</Text>
      </View>
      <Formik style={styles.formContainer}
        initialValues={{
          username: '',
          password: '',
          passwordValidator: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={({username, password}) => {
          mutate({
            variables: {
              username,
              password
            }
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text>{'username'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            { errors.username && touched.username ? (<Text>{errors.username}</Text>) : null}
            <Text>{'password'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            { errors.password && touched.password ? (<Text>{errors.password}</Text>) : null}
            <Text>{'Re-enter Password'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('passwordValidator')}
              onBlur={handleBlur('passwordValidator')}
              value={values.passwordValidator}
            />
            { errors.passwordValidator && touched.passwordValidator && touched.password && !isEqual(values.passwordValidator, values.password)
              ? ( <Text>{errors.passwordValidator}</Text> )
              : null
            }
            <TouchableOpacity
              style={styles.submitButton}
              type="submit"
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView >
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    marginBottom: 20
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
