/**
 * Service used for uploading files into application memory.
 */
export default class SelectFileService {

  /**
   * Opens pop-up to select file.
   *
   * @return {Promise<File>} - promise, wrapping selected image file.
   */
  async selectImage() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.addEventListener('change', () => {
        return resolve(input.files.item(0));
      });

      input.click();
    });
  }
}
