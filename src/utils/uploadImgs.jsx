
const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('i not submit button')
    console.log(`event ${event}`);
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//    const uplodImg= await fetch("http://localhost:3018/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const responseUrl = await uplodImg.json();
//      console.log(responseUrl.path);
//      const getImg = await fetch(`http://localhost:3018/${responseUrl.path}`)
//      console.log(getImg.url);
//     setUrl(getImg.url);
  };

  export default handleSubmit