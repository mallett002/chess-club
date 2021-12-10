import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, Alert, Input } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      passwordValidator: ''
    }
  });

  const onSubmit = data => console.log('fire away! ', data);

  return (
    <SafeAreaView style={styles.signUpContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Sign Up'}</Text>
        <Text style={styles.subtitle}>{'Create an account an start playing!'}</Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>{'Username'}</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name='username'
        />
        {errors.username && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>{'Password'}</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name='password'
        />
        {errors.password && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>{'Re-enter Password'}</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name='passwordValidator'
        />
        {errors.passwordValidator && <Text>This is required.</Text>}
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
