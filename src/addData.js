const firebaseConfig = {
    apiKey: "AIzaSyA3cieZtbsasWDF-yy_w5uSeJz28voRqWg",
    authDomain: "hgo-weather-app.firebaseapp.com",
    projectId: "hgo-weather-app",
    storageBucket: "hgo-weather-app.appspot.com",
    messagingSenderId: "27190543047",
    appId: "1:27190543047:web:7c9618d3a01cb50525b4e2",
    measurementId: "G-P3TREL777T"
  };
const {doc, getDoc, getFirestore, setDoc }=require('firebase/firestore');
const {initializeApp} = require('firebase/app');
const data=require('./citiesData06.json');
const {Blob} = require('node:buffer')

async function insertData(){
    var count=0;
    var count01=0;
    const data1={}
    initializeApp(firebaseConfig);
    var db = await getFirestore();

    console.log(Object.keys(data).length)
    const getData = await getDoc(doc(db,"City","DE"));

    if(getData.exists()){
      console.log(getData.data());
    }

    // for(const code in data){
    //   var namesArray=[]
    //   var dataObj={}
    //   var sortedNamesArray=[]
    //   var finalData=[]
    //   data[code].forEach(elem=>{
    //     namesArray.push(elem.name);
    //     dataObj[elem.name]=elem;
    //   });
    //   sortedNamesArray=namesArray.sort();
    //   sortedNamesArray.forEach(elem=>{
    //     finalData.push(dataObj[elem]);
    //   });
    //   count=count+1;
    //   console.log(count)
    //   try{
    //     await setDoc(doc(db,"City",code),{cities:finalData});
    //   }catch(err){
    //     console.log(code)
    //     var finalData01=[];
    //     var finalData02=[];
    //     finalData.forEach((elem,index)=>{
    //       if(index<=finalData.length/2){
    //         finalData01.push(elem)
    //       }else{
    //         finalData02.push(elem)
    //       }
    //     });
    //     await setDoc(doc(db,"City",code),{cities:finalData01});
    //     await setDoc(doc(db,"City",code+1),{cities:finalData02});
    //   }
    // }
}

insertData();