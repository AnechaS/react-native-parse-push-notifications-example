import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function (pushToken) {
  const data = {
    channels: [],
    appIdentifier: DeviceInfo.getBundleId(),
    appName: DeviceInfo.getApplicationName(),
    appVersion: DeviceInfo.getVersion(),
    deviceToken: pushToken,
    deviceType: Platform.OS,
    installationId: DeviceInfo.getUniqueID(),
    localeIdentifier: DeviceInfo.getDeviceLocale(),
    parseVersion: '2.3.2',
    timeZone: DeviceInfo.getTimezone(),
    pushType: Platform.OS === 'android' ? 'gcm' : undefined
  };

  return fetch('PARSE_URL', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-Parse-Application-Id': 'YOUR_APP_ID',
        'X-Parse-REST-API-Key': 'YOUR_REST_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then(({ objectId }) => {
      console.log('Parse Installation registered successfully with objectId=%s', objectId)
      return objectId
    })
    .catch((err) => console.log(err))
};