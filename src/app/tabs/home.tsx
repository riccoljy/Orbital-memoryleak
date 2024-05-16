import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import unibudslogo from '@/assets/images/unibuds.png';
import { supabase } from "@/src/supabase/supabase.js";


const HomePage = () => {

  return (
    <View style={styles.container}>
      Welcome Home
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default HomePage;