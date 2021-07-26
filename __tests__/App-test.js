/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';
import { ApolloClient, ApolloProvider } from '@apollo/client';

jest.useFakeTimers();
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  ApolloClient: jest.fn(),
  ApolloProvider: jest.fn()
}));

describe('App', () => {
  let client;

  beforeEach(() => {
    client = {};
    apolloComponent = () => <View />;

    ApolloProvider.mockReturnValue(<apolloComponent />);
    ApolloClient.mockReturnValue(client);
  });

  it('renders correctly', () => {
    render(<App />);
  });
});
