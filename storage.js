// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration here
  };
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the storage service and Firestore database
  const storage = firebase.storage();
  const db = firebase.firestore();
  
  // Function to upload a file to Firebase Storage and store metadata in Firestore
  function uploadFile(file, userId, secretMessage, lth, skip) {
    // Create a unique file name based on the current timestamp
    const fileName = Date.now() + '_' + file.name;
    const storageRef = storage.ref('files/' + fileName);
  
    // Upload the file to Firebase Storage
    storageRef.put(file)
      .then(snapshot => {
        // Get the download URL of the file
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        // Store metadata about the file in Firestore
        return db.collection('files').add({
          userId,
          fileName,
          downloadURL,
          secretMessage,
          lth,
          skip,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(docRef => {
        console.log('File uploaded and metadata stored:', docRef.id);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  }
  
  // Example code for uploading a file and storing metadata
  const fileInput = document.getElementById('fileInput');
  const submitButton = document.getElementById('submitButton');
  
  submitButton.addEventListener('click', event => {
    event.preventDefault();
  
    const file = fileInput.files[0];
    const userId = 'user123'; // Replace with the actual user ID
    const secretMessage = 'Hello world!';
    const lth = 8;
    const skip = 0;
  
    uploadFile(file, userId, secretMessage, lth, skip);
  });
  
  // Example code for creating a button to direct users to the "posts" page
  const postsButton = document.createElement('button');
  postsButton.textContent = 'View Posts';
  postsButton.addEventListener('click', event => {
    event.preventDefault();
    window.location.href = 'posts.html';
  });
  
  const container = document.getElementById('container');
  container.appendChild(postsButton);
  