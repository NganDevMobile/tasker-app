import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetPhotos } from 'hooks';
import { IPhoto } from 'models';
import useStore from '@zustand';
import { use } from 'i18next';
import { RouterNames } from '@common';
import { useNavigation } from '@react-navigation/native';
import BoldText from '../../components/Text/BoldText';
import Header from '@components/Header';
import FastImage from 'react-native-fast-image';
import images from '@theme/images';
import { sizeScale } from '@common/Scale';
import { colors } from 'utils';
import { RegularText } from '@components/Text';

const HomeScreen = () => {
  const { mutateAsync: getPhotos, isPending } = useGetPhotos();
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [visible, setVisible] = useState(false);
  const setPhotoList = useStore(state => state.setPhotoList);
  const navigation = useNavigation();

  const handleGetPhotos = async () => {
    const data = await getPhotos();
    if (data) {
      setPhotos(data);
      setPhotoList(data);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    // handleGetPhotos();
  }, []);

  if (isPending)
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  const renderPhotos = () => {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <Button
            title="Go to task screen"
            onPress={() =>
              navigation.navigate(RouterNames.TASK_SCREEN as never)
            }
          />
        </View>
        <ScrollView>
          {photos.map(photo => (
            <View
              key={photo.id}
              style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: photo.thumbnailUrl }}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ marginLeft: 10 }}>{photo.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Index" />
      <Button title="Show Modal" onPress={toggleModal} />

      {/* {photos.length > 0 ? renderPhotos() : <BoldText>Empty List</BoldText>} */}
      <View style={styles.container}>
        <FastImage source={images.checklist} style={styles.imgChecklist} />
        <RegularText style={[styles.textWhite, { fontSize: sizeScale(20) }]}>
          What do you want to do today?
        </RegularText>
        <RegularText
          style={[
            styles.textWhite,
            { fontSize: sizeScale(16), marginTop: sizeScale(10) },
          ]}
        >
          Tap + to add your tasks
        </RegularText>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          {/* Nội dung của modal */}
          <Button title="Close Modal" onPress={toggleModal} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgChecklist: {
    width: sizeScale(230),
    height: sizeScale(230),
  },
  textWhite: {
    color: colors.white100Primary,
  },
  modalContainer: {
    flex: 1 / 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
