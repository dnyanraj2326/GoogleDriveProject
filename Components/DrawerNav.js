import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListItem,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RNFS} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import GDrive from 'react-native-google-drive-api-wrapper';
// import {
//   GDrive,
//   MimeTypes,
// } from '@robinbobin/react-native-google-drive-api-wrapper';

const APP_DIRECTORY = 'ReactAppExample';

const HomeScreen = ({route, navigation, fileDetails}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [filePath, setFilePath] = useState({});
  const [inputTextValue, setInputTextValue] = useState('');
  // console.log('This is a File Path' + filePath);
  useEffect(() => {
    setUserInfo(route.params.userInfo);
  }, []);

  // const _chooseFile = async () => {
  //   try {
  //     const fileDetails = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log('fileDetails : ' + JSON.stringify(fileDetails));
  //     setFilePath(fileDetails);
  //     console.log('filePath : ' + JSON.stringify(filePath));
  //   } catch (error) {
  //     setFilePath({});
  //     alert(
  //       DocumentPicker.isCancel(error)
  //         ? 'Canceled'
  //         : 'Unknown Error: ' + JSON.stringify(error),
  //     );
  //   }
  // };

  const _initGoogleDrive = async () => {
    let token = await GoogleSignin.getTokens();
    if (!token) return alert('Failed to get token');
    console.log('res.accessToken =>', token.accessToken);
    GDrive.setAccessToken(token.accessToken);
    GDrive.init();
    // const gdrive = new GDrive();
    // gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;

    // console.log(await gdrive.files.list());
    return GDrive.isInitialized();
  };

  const _uploadDriveData = async () => {
    try {
      // Check if file selected
      if (!inputTextValue) return alert('Please Enter Some Input');
      if (!(await _initGoogleDrive())) {
        return alert('Failed to Initialize Google Drive');
      }
      // Create Directory on Google Device
      console.log('Data show :' + inputTextValue);
      // let directoryId = await GDrive.safeCreateFolder({
      //   name: APP_DIRECTORY,
      //   parents: ['root'],
      // });
      // console.log('directoryId -> ', directoryId);
      // console.log('Data show second row:' + inputTextValue);

      let fileName = new Date().getTime() + '.txt';

      console.log('File name :' + fileName);
      // Check upload file response for success
      let result = await GDrive.files.createFileMultipart(
        inputTextValue,
        'application/text',
        {
          parents: ['React'],
          name: fileName,
        },
        false,
      );
      console.log('result show value:' + JSON.stringify(result));
      // Check upload file response for success
      if (!result.ok) return alert('Uploading Failed');
      // Getting the uploaded File Id
      let fileId = await GDrive.files.getId(
        fileName,
        ['root'],
        'application/text',
        false,
      );
      setInputTextValue('');
      alert(`Uploaded Successfull. File Id: ${fileId}`);
      // const id = (
      //   await gdrive.files
      //     .newMultipartUploader()
      //     .setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
      //     .setRequestBody({
      //       name: 'multipart_bin',
      //     })
      //     .execute()
      // ).id;

      // console.log(await gdrive.files.getBinary(id));
    } catch (error) {
      console.log('Error->', error);
      alert(`Error-> ${error}`);
    }
  };

  // const _uploadDriveDataImage = async () => {
  //   try {
  //     if (Object.keys(filePath).length == 0)
  //       return alert('Please Select any File');
  //     if (!(await _initGoogleDrive())) {
  //       return alert('Failed to Initialize Google Drive');
  //     }

  //     console.log('filePath data is : ' + JSON.stringify(filePath));
  //     const data = [...filePath];
  //     console.log('this is my data :' + JSON.stringify(data));
  //     let fileContent = await RNFS.readFile(filePath.uri, 'base64');
  //     console.log('fileContent -> ', JSON.stringify(fileContent));
  //     // console.log('Exicute this line..');
  //     let directoryId = await GDrive.files.safeCreateFolder({
  //       name: APP_DIRECTORY,
  //       parents: ['root'],
  //     });
  //     console.log('All directoryId is hear -> ', directoryId);
  //     let result = await GDrive.files.createFileMultipart(
  //       fileContent,
  //       filePath.type,
  //       {
  //         parents: [directoryId],
  //         name: filePath.name,
  //       },
  //       true,
  //     );
  //     if (!result.ok) return alert('Uploading Failed');
  //     let fileId = await GDrive.files.getId(
  //       filePath.name,
  //       [directoryId],
  //       filePath.type,
  //       false,
  //     );
  //     alert(`Uploaded Successfull. File Id: ${fileId}`);
  //     setFilePath({});
  //   } catch (error) {
  //     console.log('Error->', error);
  //     alert(`Error-------> ${error}`);
  //   }
  // };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
            }}>
            User Name: {userInfo ? userInfo.user.name : ''}
          </Text>
          <Text
            style={{
              paddingTop: 7,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
            }}>
            User Email: {userInfo ? userInfo.user.email : ''}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={signOut}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: '#eee',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#000',
              }}>
              SignOut
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          style={{}}
          placeholder="Please Enter Text to Upload as a File"
          onChangeText={input => setInputTextValue(input)}
          value={inputTextValue}
        />
      </View>
      <View style={{paddingTop: 50}}>
        {/* <TouchableOpacity
            onPress={_chooseFile}
            style={{
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#eee',
            }}>
            <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
              Choose File
            </Text>
          </TouchableOpacity> */}
        <TouchableOpacity
          onPress={_uploadDriveData}
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#eee',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
            Upload DriveDataImage
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* {Object.Value(filePath).map((item, ind) => (
            <View key={ind}>
              <Text> {item.name} </Text>
            </View>
          ))} */}
      </View>
    </View>
  );
};

export default HomeScreen;
