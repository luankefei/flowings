function loadImage(path: string): any {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      console.log("image onload");
      resolve(image);
    };
    image.onerror = (err) => {
      console.log("image onerror");
      reject(err);
    };
    // image.onerror = (err) => {
    // const imageNoCross = new Image();
    // imageNoCross.onload = () => resolve(image);
    // imageNoCross.onerror = () => reject(err);
    // imageNoCross.src = path;
    // };
    image.src = path;
  });
}

// load image & filter catched onerror undefined
function loadImageList(paths: string[]) {
  console.log("loadImageList");
  return Promise.allSettled(paths.map((path: string) => loadImage(path)));
}

export { loadImage, loadImageList };
