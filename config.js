
import * as firebase from 'firebase'
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyD9BQBD-_6RYCMVrudo7gVCfx8TSaMhgbU",
    authDomain: "story-hub-1b203.firebaseapp.com",
    projectId: "story-hub-1b203",
    storageBucket: "story-hub-1b203.appspot.com",
    messagingSenderId: "638412553482",
    appId: "1:638412553482:web:9c03f29f7d10b08f580ef3"
  };
  
 firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()