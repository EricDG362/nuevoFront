//configuracion de apollo
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from 'apollo-link-context';
import { Platform } from 'react-native';

const ip_mac = '192.168.100.156'
const httpLink = createHttpLink({
  //uri: Platform.OS === 'ios' ? 'http://localhost:4000/': 'http://10.0.2.2:4000/'
  //uri: Platform.OS === 'ios' ? 'http://localhost:4000/': `http://${ip_mac}:4000/`
  uri:'https://vast-inlet-86204-a2f0a1aa0ae6.herokuapp.com'


})

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await AsyncStorage.getItem('token');
   
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '', // Asegúrate de incluir el espacio después de 'Bearer'
      },
    };
  } catch (error) {
    console.error('Error al recuperar el token:', error);
    return { headers };
  }
});



const client = new ApolloClient({
  
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});




export default client