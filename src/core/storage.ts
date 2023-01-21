'An abstraction on top of the AsyncStorage module'

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`Failed to save ${key} with error ${e}`);
  }
}


export const fetchData = async (key: string) => {
  try {
    const value: string|null = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch(e) {
    console.log(`Failed to fetch ${key} with error ${e}`);
  }
}

export enum StorageKeys {
  RECIPES = 'recipe-book'
}
