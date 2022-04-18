import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GDrive from 'react-native-google-drive-api-wrapper';
import RNFS from 'react-native-fs';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'GoogleDrive.db'});

const UploadingData = ({route, navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [getData, setGetData] = useState();
  const [S_Name, setName] = useState('');
  const [S_Phone, setPhone] = useState();
  const [S_Address, setAddress] = useState('');

  const [temps, setTemps] = useState([]);
  const [getResults, setGetResults] = useState();
  const [id, setId] = useState();
  const [fileNames, setFileNames] = useState();

  useEffect(() => {
    setUserInfo(route.params.userInfo);
  }, []);

  const _initGoogleDrive = async () => {
    let token = await GoogleSignin.getTokens();
    if (!token) return alert('Failed to get token');
    console.log('res.accessToken =>', token.accessToken);
    GDrive.setAccessToken(token.accessToken);
    GDrive.init();

    if (GDrive.isInitialized()) {
      try {
        //-----Google Drive Created Folder-----!!
        const folderId = await GDrive.files.safeCreateFolder({
          name: 'Riser',
          parents: ['root'],
        });
        console.log('Folder Created Successfully');

        //-----SqLite Get Data-----!!

        console.log('This is Temps data :', await temps);
        const jsonData = await JSON.stringify(temps);
        console.log('This is Temps data Second:', await jsonData);

        //-----Google Drive Created Files-----!!

        await GDrive.files.createFileMultipart(
          jsonData,
          'application/json',
          {
            parents: [folderId],
            name: 'DriveFile',
          },
          false,
        );
        console.log('File Created SuccessFully');

        //-----Google Drive Getting File Id-----!!
        const fileId = await GDrive.files.getId(
          'DriveFile',
          [folderId],
          'application/json',
          false,
        );
        console.log(`Uploaded Successfully. File Id: ${fileId}`);

        //-----Google Drive Getting File Name-----!!
        const res = await GDrive.files.list({
          q: "'" + folderId + "' in parents",
        });
        const data = await res.json();
        setGetData(data.files);
        console.log('File Name :' + data.files[0].name);
        const fileNames = data.files[0].name;
        setFileNames(fileNames);
        //-----file get data id------
        const id_1 = await data.files[1].id;
        //------File delete id-------
        const id_2 = await data.files[2].id;
        // ------Google Drive Delete file---------
        let del = await GDrive.files.delete(id_2);
        if (del.ok) {
          console.log(`Delete Successfully. File Id ${id_2}`);
        } else {
          console.log(`Error Deletaion`);
        }
        //-----Google Drive Getting Data Contents-----!!
        const getRes = await GDrive.files.get(id_1, {alt: 'media'});
        if (getRes.ok) {
          const result = await getRes.json();
          // const resVal = await JSON.stringify(result);
          setGetResults(result);
          // const result = await getRes.text();
          // const results = await JSON.parse(result);
          //console.log("File's data :" + result);
        } else {
          console.log("File's not a ok :" + getRes);
        }
      } catch (err) {
        console.log('Err-> :' + err);
      }
    } else {
      console.log('Error ------>');
    }
  };

  //-----Downloading File from Google Drive-----!!
  const DownloadFile = async () => {
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
          console.log('File download successful');
      });
    console.log(`Destination: ${RNFS.ExternalDirectoryPath}/${fileNames}`);
  };

  //-----Deleting File from Google Drive-----!!
  // const DeleteFile = async () => {
  //   let del = await GDrive.files.delete(id);
  //   if (del.ok) {
  //     console.log(`Delete Successfully. File Id ${id}`);
  //   } else {
  //     console.log(`Error Deletaion`);
  //   }
  // };

  // -------Restore Data and send -----------

  const RestoreData = async () => {
    //let getDataResult = await JSON.stringify(getResults);
    //console.log('This GetDataResult', getDataResult);
    db.transaction(function (txn) {
      console.log('GetResult Data Show' + getResults.length);
      if (getResults) {
        var len = getResults.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            var data = getResults[i];
            txn.executeSql(
              'INSERT INTO Student_Info (student_name,student_phone,student_address) VALUES (?,?,?)',
              [data.student_name, data.student_phone, data.student_address],
              // console.log(data.student_phone)
            );
          }
          console.log('Data restored successfuly');
          console.log('Resored data is hear :' + data);
          data;
        }
      } else {
        console.log('Getting Error---->');
      }
    });
  };

  // --------Sqlite Database------------!!

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Info'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Student_Info', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Student_Info(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const insertData = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Student_Info (student_name, student_phone, student_address) VALUES (?,?,?)',
        [S_Name, S_Phone, S_Address],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Data Inserted Successfully....');
          } else Alert.alert('Failed....');
        },
      );
    });

    viewStudent();
  };

  const viewStudent = () => {
    var temp = [];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Student_Info', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log('This is all data', temp);
        setTemps(temp);
      });
    });
  };

  // ---------------Sign Out------------

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
      <View style={{paddingVertical: 20}}>
        <TextInput
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#eee',
            borderRadius: 15,
            marginTop: 10,
          }}
          onChangeText={text => setName(text)}
          placeholder="Enter Student Name"
          value={S_Name}
        />
        <TextInput
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#eee',
            borderRadius: 15,
            marginTop: 15,
          }}
          onChangeText={text => setPhone(text)}
          placeholder="Enter Student Phone Number"
          keyboardType={'numeric'}
          value={S_Phone}
        />
        <TextInput
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#eee',
            borderRadius: 15,
            marginTop: 15,
          }}
          onChangeText={text => setAddress(text)}
          placeholder="Enter Student Address"
          value={S_Address}
        />
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#eee',
            marginVertical: 20,
            borderRadius: 15,
            marginHorizontal: 70,
          }}
          onPress={insertData}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000',
              fontSize: 16,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 0}}>
        <TouchableOpacity
          onPress={_initGoogleDrive}
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: '#eee',
            marginTop: 15,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
            Upload Data To Drive
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 0}}>
        <TouchableOpacity
          onPress={DownloadFile}
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: '#eee',
            marginTop: 20,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
            Download File
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={RestoreData}
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: '#eee',
            marginTop: 20,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
            Restore Data
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* <FlatList
          data={getResults}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        /> */}
      </View>
    </View>
  );
};

export default UploadingData;
