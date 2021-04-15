const cardContainer = document.querySelector(".cards")
const imgPreview = document.getElementById('img-preview');
const fileUpload = document.getElementById('file');
const spinner = document.querySelector(".spinner");

const CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/dtim67ugh/upload";
const CLOUDINARY_UPLOAD_PRESET = "rufy0gue";

const imageCollection = []
let loading = true;

fileUpload.addEventListener('change', (event) => {
    let file = event.target.files[0];

    spinner.classList.add('active')

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-ww-form-urlencoded'
        },
        data: formData,
    }).then(res => {
        spinner.classList.remove('active')
        imgPreview.src = res.data.secure_url; 
        imageCollection.push(imgPreview.src);
        
        let card = imageCollection.map(element => {
            return `<div class="item">
            <img src=${element} alt="">
            <h3>flip</h3>
            </div>`
        });

        cardContainer.innerHTML = card;

    })
        .catch(err => console.log(err))
});



