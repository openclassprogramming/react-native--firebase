import React, { Component } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

let db = firebase.database();
let ref = db.ref("sekolah");
let data = ref.child("siswa");
let tampung = [];

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      nilai: '',
    };
  }

  componentDidMount() {
    ref.on("child_added", (snapshot) => {
      tampung = [];
      snapshot.forEach((childSnapshot) => {
        tampung.push(childSnapshot.val());
      });
      this.setState({
        dataSource: tampung
      })
    });
  }

  btnInsert() {
    let nama = this.state.nama;
    let nilai = this.state.nilai;
    data.push().set(
      {
        nama: nama,
        nilai: nilai
      }, (error) => {
        if (error) {
          alert("Data gagal di insert." + error);
        } else {
          ref.on("child_added", (snapshot) => {
            tampung = [];
            snapshot.forEach((childSnapshot) => {
              tampung.push(childSnapshot.val());
            });
            this.setState({
              dataSource: tampung
            });
          });
        }
      });
  }

  btnDelete() {
    data.remove('siswa/data').then(res => {
      this.setState({
        dataSource: []
      })
    }, err => {

    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, marginTop: 50 }}>Open Class Programming</Text>
          <Text style={{ fontFamily: 'sans-serif-light', marginBottom: 40 }}>Contoh penggunaan Firebase</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              style={{ height: 40, width: 280, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10 }}
              placeholder="Masukan nama anda"
              onChangeText={(nama) => this.setState({ nama })}
            />

            <TextInput
              style={{ height: 40, width: 280, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 10 }}
              placeholder="Masukan nilai"
              keyboardType='numeric'
              onChangeText={(nilai) => this.setState({ nilai })}
            />

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 5 }} >
                <Button
                  onPress={() => {
                    this.btnInsert()
                  }}
                  title="Submit"
                  color="blue"
                  accessibilityLabel="Insert"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }} >
                <Button
                  onPress={() => {
                    this.btnDelete()
                  }}
                  title="Delete"
                  color="red"
                  accessibilityLabel="Delete"
                />
              </View>
            </View>

            <View style={{ flex: 3 }}>
              <FlatList
                data={this.state.dataSource}
                keyExtractor={(item, index) => item.nama}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => {
                  return (
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#E6ECEF' }}>
                        <View style={{ flex: 4, padding: 10 }} >
                          <Text style={{ fontFamily: 'sans-serif-medium', color: '#000000' }}>Nama : {item.nama}</Text>
                          <Text style={{ fontFamily: 'sans-serif-light', color: '#000000' }}>Nilai : {item.nilai}</Text>
                        </View>
                      </View>
                    </View>
                  )
                }}
              />
            </View>

          </View>

        </View>

      </View>
    );
  }
}
