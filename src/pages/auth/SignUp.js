import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    textAlign: 'center',
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
    color: 'black'
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

  const onSubmit = data => console.log(data);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>{'Sign Up'}</Text>
        <Text style={styles.subtitle}>{'Create an account an start playing!'}</Text>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
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
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='password'
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='passwordValidator'
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
