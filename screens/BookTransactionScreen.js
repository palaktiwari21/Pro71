import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AppHeader from './AppHeader';
import * as firebase from 'firebase';
import db from '../config';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookId: '',
        scannedStudentId:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

      if(buttonState==="BookId"){
        this.setState({
          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      }
      else if(buttonState==="StudentId"){
        this.setState({
          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
      
    }
    submitStory=()=>{
      db.collection('storyDetails').doc().get()
    }

    render() {
      

              
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View>
            <AppHeader/>
            
              
          
          <View style={styles.container}>
          
              
            <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Story Title"
              />
           
           
            </View>
            <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Author name"
              />
               
            </View>
            <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox2}
              placeholder="Write A Story"
              />
              
               
            </View>
            <TouchableOpacity
            style={styles.submitButton}
            onPress={this.submitStory}
           >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          </View>
         
          </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: 'pink',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 1.5,
      fontSize: 20
    },
    inputBox2:{
      width:400,
      height: 200,
      borderWidth: 1.5,
      borderRightWidth: 1.5,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor:'pink',
      width:100,
      height:50
    },
    submitButtonText:{
      padding:10,
      textAlign:'center',
      fontSize:20,
      fontWeight:'bold',
      color:'black'
    }
  });