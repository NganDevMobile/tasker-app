import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { sizeScale } from '@common/Scale';
import { RegularText } from '@components/Text';
import { colors } from 'utils';

interface HeaderProps {
  leftIcon?: Element;
  title: string;
  rightIcon?: Element;
}

const Header = (props: HeaderProps) => {
  const { leftIcon, title, rightIcon } = props;
  return (
    <View style={styles.container}>
      <FastImage source={leftIcon} style={styles.icon} />
      <RegularText style={styles.title}>{title}</RegularText>
      <FastImage source={rightIcon} style={styles.icon} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  icon: {
    width: sizeScale(30),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
  },
  title: {
    fontSize: sizeScale(20),
  },
});
