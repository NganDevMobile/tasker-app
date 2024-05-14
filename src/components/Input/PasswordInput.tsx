import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { useController } from 'react-hook-form'
// Components
import { RegularText } from '../Text'
// Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { InputProps } from './Type'
// Theme
import { Layout } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import { sizeScale } from '@/Common/Scale'

const PasswordInput = (props: InputProps) => {
  const {
    controller,
    placeholder,
    inputStyle,
    containerStyle,
    icon,
    errorText,
  } = props
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  })
  const [isShow, setIsShow] = useState<boolean>(false)
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          Layout.rowHCenter,
          {
            borderColor: errorText
              ? Colors.error
              : field.value !== ''
              ? Colors.primary
              : Colors.placeHolder,
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
          secureTextEntry={!isShow}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={Colors.placeHolder}
          {...props}
        />
        <TouchableOpacity onPress={() => setIsShow(prev => !prev)}>
          <Octicons
            name={isShow ? 'eye' : 'eye-closed'}
            size={sizeScale(18)}
            color={Colors.primary}
          />
        </TouchableOpacity>
        {!errorText && field.value !== '' && (
          <Icon
            style={{ marginLeft: sizeScale(5) }}
            name={'done'}
            size={sizeScale(20)}
            color={Colors.primary}
          />
        )}
      </View>
      {errorText && <RegularText style={styles.error}>{errorText}</RegularText>}
    </View>
  )
}

export default PasswordInput

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
    // fontFamily: FONT_FAMILY.REGULAR,
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
})
