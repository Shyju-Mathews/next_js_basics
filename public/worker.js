// import Compressor from "compressorjs";

// onmessage = function (e) {
//     const { file } = e.data;
//     console.log(file, "file");
//     console.log(e.data, "event");

//     new Compressor(file, {
//         quality: 0.6,
//         success(result) {
//             postMessage({ success: true, file: result})
//         },
//         error(err) {
//             postMessage({ success: false, error: err.message})
//         }
//     })
// }


import Compressor from "compressorjs";
import Pica from "pica";
self.onmessage = async (event) => {
  const { file, width, height } = event.data;
  console.log(file, "file", width, "width", height, "height");
  console.log(event.data, "event data");
  // Convert File to ImageBitmap
  const imageBitmap = await createImageBitmap(file);
  // Use OffscreenCanvas
  const offscreen = new OffscreenCanvas(width, height);
  const ctx = offscreen.getContext("2d");
  if (!ctx) {
    self.postMessage({ error: "Failed to get OffscreenCanvas context" });
    return;
  }
  //Resize using Pica
  const pica = Pica();
  const resizedCanvas = await pica.resize(imageBitmap, offscreen);
  // Convert to Blob
  resizedCanvas.toBlob((blob) => {
    if (!blob) {
      self.postMessage({ error: "Blob conversion failed" });
      return;
    }
    // Compress using Compressor.js
    new Compressor(blob, {
      quality: 0.7,
      success(result) {
        self.postMessage({ compressedFile: result });
      },
      error(err) {
        self.postMessage({ error: err.message });
      },
    });
  }, "image/jpeg");
};
