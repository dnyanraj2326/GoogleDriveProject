import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {
//   GDrive,
//   MimeTypes,
// } from '@robinbobin/react-native-google-drive-api-wrapper';
import GDrive from 'react-native-google-drive-api-wrapper';
import RNFS from 'react-native-fs';

const UploadingData = ({route, navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [getData, setGetData] = useState();
  const [inputTextValue, setInputTextValue] = useState('');

  useEffect(() => {
    setUserInfo(route.params.userInfo);
  }, []);

  const _initGoogleDrive = async () => {
    let token = await GoogleSignin.getTokens();
    if (!token) return alert('Failed to get token');
    console.log('res.accessToken =>', token.accessToken);
    GDrive.setAccessToken(token.accessToken);
    GDrive.init();
    // const gdrive = new GDrive();
    // gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
    // GDrive.init();

    // console.log(await gdrive.files.list());
    if (GDrive.isInitialized()) {
      //Google Drive is Initialized Now!!
      try {
        const folderId = await GDrive.files.safeCreateFolder({
          name: 'Riser',
          parents: ['root'],
        });
        console.log('Folder Created');
        let content = 'Finally Done!!!!!!!!';
        // const content = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 9, 8, 7, 4];
        // const arr = [{name: 'mango'}, {name: 'apple'}];
        let fileName = new Date().getTime() + '.txt';
        await GDrive.files.createFileMultipart(
          content,
          'application/json',
          {
            parents: [folderId],
            name: fileName,
          },
          false,
        );
        console.log('File Created');

        let fileId = await GDrive.files.getId(
          fileName,
          [folderId],
          'application/json',
          false,
        );
        console.log(`Uploaded Successfull. File Id: ${fileId}`);
        // alert(`Uploaded Successfull. File Id: ${fileId}`);

        const res = await GDrive.files.list({
          q: "'" + folderId + "' in parents",
        });
        const data = await res.json();
        setGetData(data.files);
        // let fileContent = await RNFS.readFile(data.files[0], 'base64');
        // console.log('fileContent -> ', JSON.stringify(fileContent));
        console.log('This is my data :' + data.files[0].name);
        const fileNames = data.files[0].name;
        const id = await data.files[0].id;
        const getRes = await GDrive.files.get(id, {alt: 'media'});
        // const getDatas = await getRes.json();
        if (getRes.ok) {
          const result = await getRes.text();
          console.log("File's data :" + result);
        } else {
          console.log("File's not a ok :" + getRes);
        }

        let del = await GDrive.files.delete(id);
        if (del.ok) {
          console.log(`Delete Successfull. File Id ${id}`);
        } else {
          console.log(`Error Deletaion`);
        }
        console.log(`Destination: ${RNFS.ExternalDirectoryPath}/${fileNames}`);

        GDrive.files
          .download(id, {
            toFile: `${RNFS.ExternalDirectoryPath}/${fileNames}`,
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          })
          .promise.then(res => {
            console.log({res});
            if (res.statusCode == 200 && res.bytesWritten > 0)
              alert('File download successful');
            console.log('File download successful');
          });
      } catch (err) {
        //.. catch the error accordingly
        console.log('Err-> :' + err);
      }
    } else {
      console.log('Error ------>');
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
      navigation.navigate('Details');
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
          onPress={_initGoogleDrive}
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
        {/* <Text onPress={item => getData(item)}>{item.name}</Text> */}
      </View>
    </View>
  );
};

export default UploadingData;
