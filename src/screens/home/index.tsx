import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetPhotos } from 'hooks';
import { IPhoto } from 'models';

const HomeScreen = () => {
  const { mutateAsync: getPhotos, isPending } = useGetPhotos();
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const handleGetPhotos = async () => {
    const data = await getPhotos();
    if (data) setPhotos(data);
  };

  useEffect(() => {
    handleGetPhotos();
  }, []);

  if (isPending)
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  const renderPhotos = () => {
    return (
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
            }}>
            <Image
              source={{ uri: photo.thumbnailUrl }}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ marginLeft: 10 }}>{photo.title}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {photos.length > 0 ? renderPhotos() : <Text>Empty List</Text>}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
