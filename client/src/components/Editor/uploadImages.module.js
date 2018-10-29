import { uploadMedia } from '../../services/apiService';
import loader from './ajax-loader.gif'
const Delta = window.Quill.import('delta');
const token = localStorage.getItem('token');

const imageHandler = function(image, callback) {
  let fileInput = this.container.querySelector('input.ql-image[type=file]');
  if (fileInput == null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        var formData = new FormData();
        const range = this.quill.getSelection(true);
        formData.append("media", fileInput.files[0]);
        this.quill.insertEmbed(range.index, 'image', loader); 
        this.quill.setSelection(range.index + 1);
        uploadMedia(formData, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
            responseType:'json'
        }).then((res) => { 
          console.log(res)
          this.quill.deleteText(range.index, 1);
          this.quill.updateContents(new Delta()
          .retain(range.index)
          .delete(range.length)
          .insert({ image:  res.data.url})
          , window.Quill.sources.USER);
          this.quill.setSelection(range.index + 1);
          fileInput.value = "";
        }).catch(err => {
          window.swal("Error", "Sorry an error has occurred!", "error");
        });
      }
    });
    this.container.appendChild(fileInput);
  }
  fileInput.click();
}

export default imageHandler;