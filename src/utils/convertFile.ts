const convertFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const arrayBuffer = reader.result as ArrayBuffer;
    //   const uint8Array = new Uint8Array(arrayBuffer);
    //   let binaryString = '';
    //   for (let i = 0; i < uint8Array.length; i++) {
    //     binaryString += String.fromCharCode(uint8Array[i]);
    //   }
    //   resolve(binaryString);
    // };
    // reader.onerror = () => {
    //   reject(new Error('Failed to read file'));
    // };
    // reader.readAsArrayBuffer(file);
  });
};

export default convertFile;