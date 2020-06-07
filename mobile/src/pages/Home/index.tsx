import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import api from '../../services/api';

// Interfaces para response do IBGE
interface IBGEUFResponse {
  sigla: string;
  nome: string;
}
interface IBGECityResponse {
  nome: string;
}
interface UFs {
  value: string;
  label: string;
}
interface Cities {
  value: string;
  label: string;
}

const Home = () => {

    const navigation = useNavigation();

    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [ufs, setUfs] = useState<UFs[]>([]);
    const [cities, setCities] = useState<Cities[]>([]);

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
          const ufs = response.data.map((uf) => {
              return {value: uf.sigla, label: uf.nome}
          });
          ufs.sort((a, b) => (a.label < b.label ? -1 : 1));
          setUfs(ufs);
      });
    }, []);

    useEffect(() => {
      if (selectedUf === '') {
          return;
      }
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
          const cityNames = response.data.map((city) => {
            return {value: city.nome, label: city.nome}
          });
          setCities(cityNames);
      });
    }, [selectedUf]);

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
          selectedUf,
          selectedCity
        });
    }


    return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
        >
          <ImageBackground
              source={require('../../assets/home-background.png')}
              style={styles.container}
              imageStyle={{ width: 274, height:368 }}
          >
              <View style={styles.main}>
                  <Image source={require('../../assets/logo.png')} />
                  <View>
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                  </View>
              </View>

              <View style={styles.footer}>

                <View>
                  <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={{
                      label: 'Selecione um estado...',
                    }}
                    Icon={() => {
                      return <Icon name="arrow-down" size={24} color="#34CB79" />
                    }}
                    onValueChange={value => {
                      setSelectedUf(value);
                    }}
                    items={ufs}
                  />

                  <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={{
                      label: 'Selecione uma cidade...'
                    }}
                    Icon={() => {
                      return <Icon name="arrow-down" size={24} color="#34CB79" />
                    }}
                    onValueChange={value => {
                      setSelectedCity(value);
                    }}
                    items={cities}
                  />
                </View>

                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                  <View style={styles.buttonIcon}>
                      <Text>
                          <Icon name="arrow-right" color="#FFF" size={24}></Icon>
                      </Text>
                  </View>
                  <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
              </View>

          </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,

    // paddingVertical: 12,
    // borderWidth: 1,
    // borderColor: 'gray',
    // color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,

    // fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: 'purple',
    // borderRadius: 8,
    // color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 18,
    right: 12,
  }
}); 

export default Home;