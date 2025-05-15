import React from 'react';
import {Switch, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
// import {authState, setIsOnline} from '../../store/slices/auth';

export const FCMToggle = () => {
  //   const {isOnline} = useSelector(authState);
  const dispatch = useDispatch();

  const toggleOnline = () => {
    // dispatch(setIsOnline(!isOnline));
    // по желанию отключать/включать FCM вручную
    // например: messaging().unsubscribeFromTopic('orders')
  };

  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', paddingRight: 10}}>
      <Text style={{marginRight: 8}}>{true ? 'На линии' : 'Не на линии'}</Text>
      <Switch value={true} onValueChange={toggleOnline} />
    </View>
  );
};
