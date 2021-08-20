/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Picker } from './src/components/Picker';
import { apiCurrencyConverter } from './src/services/converterCurrency';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCoin, setselectedCoin] = useState(null);
  const [inputCoins, setInputCoins] = useState(0);

  const [priceCoin, setPriceCoin] = useState(null);
  const [convertedCoin, setConvertedCoin] = useState(0);

  useEffect(() => {
    async function loadCoins() {
      const response = await apiCurrencyConverter.get('all');

      const arrayCoins = [];
      Object.keys(response.data).map((key) => {
        arrayCoins.push({
          key,
          label: key,
          value: key,
        });
      });

      setCoins(arrayCoins);
      setLoading(false);
    }

    loadCoins();
  }, []);

  async function conversion() {
    if (selectedCoin === null || inputCoins === 0) {
      alert('Por favor selecione uma moeda.');
      return;
    }

    // USD-BRL ele devolve quanto é 1 dolar convertido pra reais
    const response = await apiCurrencyConverter.get(`all/${selectedCoin}-BRL`);

    const result = response.data[selectedCoin].ask * parseFloat(inputCoins);
    setConvertedCoin(`R$ ${result.toFixed(2)}`);
    setPriceCoin(inputCoins);

    // Aqui ele fecha o teclado
    Keyboard.dismiss();
  }

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator color="#FFF" size={45} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.titulo}>Selecione sua moeda</Text>
        <Picker
          coinsData={coins}
          onChange={(moeda) => setselectedCoin(moeda)}
        />
      </View>

      <View style={styles.areaValor}>
        <Text style={styles.titulo}>
          Digite um valor para converter em (R$)
        </Text>
        <TextInput
          placeholder="EX: 150"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(valor) => setInputCoins(valor)}
        />
      </View>

      <TouchableOpacity style={styles.botaoArea} onPress={conversion}>
        <Text style={styles.botaoTexto}>Converter</Text>
      </TouchableOpacity>

      {convertedCoin !== 0 && (
        <View style={styles.areaResultado}>
          <Text style={styles.convertedCoin}>
            {priceCoin}
            {selectedCoin}
          </Text>
          <Text style={[styles.convertedCoin, { fontSize: 18, margin: 10 }]}>
            Corresponde a
          </Text>
          <Text style={styles.convertedCoin}>{convertedCoin}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 40,
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#F9f9f9',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
  },
  titulo: {
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5,
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#F9f9f9',
    paddingBottom: 9,
    paddingTop: 9,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#000',
  },
  botaoArea: {
    width: '90%',
    backgroundColor: '#FB4b57',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  convertedCoin: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#000',
  },
});
