const cardContainer = document.querySelector(".cards");
const imgPreview = document.getElementById("img-preview");
const fileUpload = document.getElementById("file");
const spinner = document.querySelector(".spinner");

const CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/dtim67ugh/upload";
const CLOUDINARY_UPLOAD_PRESET = "rufy0gue";

const imageCollection = [];
let loading = true;

fileUpload.addEventListener("change", (event) => {
  let file = event.target.files[0];

  spinner.classList.add("active");

  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-ww-form-urlencoded",
    },
    data: formData,
  })
    .then((res) => {
      spinner.classList.remove("active");
      imgPreview.src = res.data.secure_url; 
      imageCollection.push(imgPreview.src);
      localStorage.setItem("images", JSON.stringify(imageCollection));
    

      let card = imageCollection.map((element) => {
        return `<div class="item">
        <img src=${element} alt="">
        <div class="btn">
            <button>Delete</button>
            <button>Edit</button>
        </div>
        </div>`;
      });
      cardContainer.innerHTML = card;

    })
    .catch((err) => console.log(err));
});

// let images = JSON.parse(localStorage.getItem("images"));
// let card = images.map((image) => {
//   return `
//   <div class = "item">
//       <img src=${image} alt="">
//       <div class="btn">
//           <button>Delete</button>
//           <button>Edit</button>
//       </div>
//   </div>`;
// });

// cardContainer.innerHTML = card;

// console.log(JSON.parse(localStorage.getItem("images")));
