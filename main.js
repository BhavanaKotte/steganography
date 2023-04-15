import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, Ref} from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(); 
// const storageRef = getStorage(); 
const analytics = getAnalytics(app);

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = document.querySelector('#file').files[0];
  const message = document.querySelector('#message').value;
  // Save the encoded file to the backend server and associate it with the user's account
});

// Importing LSB steganography library
const lsb = require('lsb-steganography');
// Importing Firebase
const firebase = require('firebase');

// Function to embed a message into an image using LSB steganography
function embedMessageIntoImage(message, image, bitRate, skipBits) {
  // Load the image into a buffer
  const imageBuffer = fs.readFileSync(image);
  // Embed the message into the image using LSB steganography
  const stegImageBuffer = lsb.embed(message, imageBuffer, {bitRate, skipBits});
  // Return the steganographed image buffer
  return stegImageBuffer;
}

// Function to extract a message from an image using LSB steganography
function extractMessageFromImage(image, bitRate, skipBits) {
  // Load the image into a buffer
  const imageBuffer = fs.readFileSync(image);
  // Extract the message from the image using LSB steganography
  const extractedMessage = lsb.extract(imageBuffer, {bitRate, skipBits});
  // Return the extracted message
  return extractedMessage;
}

// Initialize Firebase with your project's credentials
firebase.initializeApp({
  apiKey: '<AIzaSyAAw0Vowk-DeOwrD1C4o09eQjTbVwTjnSk>',
  authDomain: '<stegasteganography-9efff.firebaseapp.com>',
  databaseURL: '<https://steganography-9efff-default-etdb.firebase.com>',
  projectId: '<steganography-9efff>',
  storageBucket: '<steganography-9efff.appspot.com>',
  messagingSenderId: '<943619753532>',
  appId: '<1:943619753532:web:6d4b23042ac979b4c36539>',
  measurementId: '<G-7JF69PXF60>'
});

// Function to upload a steganographed image to Firebase storage
function uploadStegImageToFirebaseStorage(stegImageBuffer, filename) {
  // Get a reference to the Firebase storage bucket
  const storageRef = firebase.storage().ref();
  // Upload the steganographed image to Firebase storage
  const fileRef = storageRef.child(filename);
  return fileRef.put(stegImageBuffer);
}

// Function to download a steganographed image from Firebase storage
function downloadStegImageFromFirebaseStorage(filename) {
  // Get a reference to the Firebase storage bucket
  const storageRef = firebase.storage().ref();
  // Download the steganographed image from Firebase storage
  const fileRef = storageRef.child(filename);
  return fileRef.getDownloadURL();
}
// Display the list of publicly accessible files
const publicFilesList = document.querySelector('#public-files');
const publicFilesRef = firebase.database().ref('public-files');
publicFilesRef.on('child_added', (snapshot) => {
  const fileData = snapshot.val();
  const fileElement = document.createElement('a');
  fileElement.textContent = fileData.filename;
  fileElement.href = fileData.downloadUrl;
  publicFilesList.appendChild(fileElement);
});

// When a user clicks on a file, retrieve the encoded file from the backend server
const fileLinks = document.querySelectorAll('#public-files a');
fileLinks.forEach((fileLink) => {
  fileLink.addEventListener('click', (e) => {
    e.preventDefault();
    const downloadUrl = fileLink.href;
    fetch(downloadUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Use the LSB steganography library to decode the secret message from the file buffer
        const secretMessage = LSB.decode(buffer);
        // Display the secret message to the user
        alert(secretMessage);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  });
});

