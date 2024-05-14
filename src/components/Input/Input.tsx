import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useController } from 'react-hook-form';
import { InputProps } from './Type';
import Layout from '@theme/Layout';
import { colors } from 'utils';
// Theme

const Input = (props: InputProps) => {
  const {
    controller,
    placeholder,
    containerStyle,
    inputStyle,
    errorText,
    icon,
  } = props;
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          Layout.rowHCenter,
          {
            borderColor: errorText
              ? colors.error
              : field.value !== ''
              ? colors.primary
              : colors.placeHolder,
          },
        ]}
      >
        {icon && (
          <View
            style={[
              styles.icon,
              Layout.center,
              {
                width: sizeScale((icon.size ?? 22) + 8),
              },
            ]}
          >
            <Icon
              name={icon.name}
              size={icon.size ?? sizeScale(22)}
              color={icon.color ?? Colors.primary}
            />
          </View>
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={Colors.placeHolder}
          {...props}
        />
        {!errorText && field.value !== '' && (
          <Icon
            style={styles.icon}
            name={'done'}
            size={sizeScale(20)}
            color={Colors.primary}
          />
        )}
      </View>
      {errorText && <MediumText style={styles.error}>{errorText}</MediumText>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeScale(18),
  },
  inputContainer: {
    height: sizeScale(40),
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: sizeScale(5),
  },
  input: {
    flex: 1,
    // fontFamily: FONT_FAMILY.MEDIUM,
    fontWeight: '500',
    fontSize: sizeScale(14),
    padding: 0,
    margin: 0,
  },
  error: {
    marginTop: sizeScale(10),
    color: Colors.error,
    fontSize: sizeScale(10),
  },
  icon: {
    marginRight: sizeScale(5),
  },
});
