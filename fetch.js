// Function to retrieve files from Firestore
function getFiles() {
    return db.collection('files')
      .orderBy('timestamp', 'desc')
      .get()
      .then(querySnapshot => {
        const files = [];
        querySnapshot.forEach(doc => {
          files.push({
            id: doc.id,
            userId: doc.data().userId,
            fileName: doc.data().fileName,
            // Add additional fields as needed
          });
        });
  
        // Get the element where you want to display the list of files
        const fileList = document.getElementById('fileList');
  
        // Create HTML elements for each file in the list
        files.forEach(file => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = `/file/${file.id}`; // Replace with the appropriate URL
          link.textContent = file.fileName;
          listItem.appendChild(link);
          fileList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.log('Error getting files: ', error);
      });
  }
  