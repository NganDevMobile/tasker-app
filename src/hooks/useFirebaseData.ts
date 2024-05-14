import { useEffect, useState, useCallback, useMemo } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const useFirebaseData = <T>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);

  const addData = useCallback(
    async (newData: T & FirebaseFirestoreTypes.DocumentData) => {
      await firestore().collection(collectionName).add(newData);
    },
    [collectionName],
  );

  const updateData = useCallback(
    async (id: string, updatedData: Partial<T>) => {
      await firestore().collection(collectionName).doc(id).update(updatedData);
    },
    [collectionName],
  );

  const deleteData = useCallback(
    async (id: string) => {
      await firestore().collection(collectionName).doc(id).delete();
    },
    [collectionName],
  );

  const unsubscribe = useMemo(() => {
    return firestore()
      .collection(collectionName)
      .onSnapshot(snapshot => {
        const newData: T[] = [];
        snapshot.forEach(doc => {
          newData.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(newData);
      });
  }, [collectionName]);

  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);

  return { data, addData, updateData, deleteData };
};

export default useFirebaseData;
