import {useCallback} from 'react';

const useWitFileRequest = () => {
  const downloadFile = useCallback(async ({url, name, authToken, onError}) => {
    try {
      const blob = await fetch(url, {
        method  : 'GET',
        headers : {
          Authorization : `Bearer ${authToken}`
        }
      })
        .then(response => response.blob());

      const localUrl = window.URL.createObjectURL(blob);
      const aTag = document.createElement('a');

      aTag.href = localUrl;
      aTag.download = name;

      document.body.appendChild(aTag);

      aTag.click();
      aTag.remove();
    } catch (error) {
      if (onError) {
        onError();
      }
    }
  }, []);

  const uploadFile = useCallback(async ({url, file, name, authToken, onError}) => {
    try {
      const formData = new FormData();

      formData.append(name, file);

      const response = await fetch(url, {
        method  : 'POST',
        headers : {
          Authorization : `Bearer ${authToken}`
        },
        body : formData
      })
        .then(stream => stream.json());

      return response;
    } catch (error) {
      if (onError) {
        onError();
      }

      return error;
    }
  }, []);

  return {
    downloadFile,
    uploadFile
  };
};

export default useWitFileRequest;
