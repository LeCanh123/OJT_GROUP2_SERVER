import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDpXGCEBtMFmEaBiPFUht4U0kQ-L3hHyh8',
  authDomain: 'upload-7fac1.firebaseapp.com',
  projectId: 'upload-7fac1',
  storageBucket: 'upload-7fac1.appspot.com',
  messagingSenderId: '652898076800',
  appId: '1:652898076800:web:e14ede0f7f574a2a25be65',
  measurementId: 'G-Y5KW6LD5W7',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// tạo ra storage
export const storage = getStorage(app);
/* 
  1st params: your file, 2nd params: folder you need 
  return 
    if failed => false
    if success => url file
*/
export async function uploadFileToStorage(
  fileUploads: any,
  folderName: any,
  bufferData: any,
) {
  // nếu file là null thì không làm gì hết
  if (!fileUploads) {
    return false;
  }
  let fileRef;
  let metadata;
  if (!bufferData) {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + fileUploads.name);
  } else {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + fileUploads.filename);
    metadata = {
      contentType: fileUploads.mimetype,
    };
  }
  let url;
  if (bufferData) {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, bufferData, metadata).then(async (res) => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then((url) => url)
        .catch(() => false);
    });
  } else {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, fileUploads).then(async (res) => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then((url) => url)
        .catch(() => false);
    });
  }
  return url;
}
