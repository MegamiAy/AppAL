import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function Comp({ navigation }) {
  const [compassData, setCompassData] = useState({});

  useEffect(() => {
    Magnetometer.addListener((result) => {
      setCompassData(result);
    });

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);

  const getHeadingText = () => {
    if (compassData && compassData.hasOwnProperty('x') && compassData.hasOwnProperty('y')) {
      const angle = Math.atan2(compassData.y, compassData.x);
      const degrees = (angle * 180) / Math.PI;
      const adjustedDegrees = (degrees + 360) % 360; // Ajuste para manter os graus entre 0 e 360

      // Determinar a direção com base nos graus
      if (adjustedDegrees >= 45 && adjustedDegrees < 135) {
        return 'Sul';
      } else if (adjustedDegrees >= 135 && adjustedDegrees < 225) {
        return 'Oeste';
      } else if (adjustedDegrees >= 225 && adjustedDegrees < 315) {
        return 'Norte';
      } else {
        return 'Leste';
      }
    } else {
      return 'Calculando...';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{getHeadingText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
  },
});
