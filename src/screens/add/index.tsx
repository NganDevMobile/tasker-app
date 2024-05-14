import { StyleSheet, SafeAreaView, View } from 'react-native';
import React from 'react';
import { colors } from 'utils';
import { BoldText } from '@components/Text';
import Header from '@components/Header';
import { sizeScale } from '@common/Scale';

const AddScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="Add task" /> */}
      <View style={styles.contain}>
        <BoldText style={styles.addTask}>Add task</BoldText>
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    paddingHorizontal: sizeScale(10),
  },
  contain: {
    backgroundColor: colors.gray,
  },
  addTask: {
    fontSize: sizeScale(20),
    marginHorizontal: 20,
  },
});
