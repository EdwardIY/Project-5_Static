const pexelsApiKey = "563492ad6f91700001000001e51734f482644b179c6330443e754d9a"
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const noImgsFound = document.getElementById("noResults")
let numOfimgs = 12;
let pageDivider = 0;



searchBtn.addEventListener("click", () => {
    numOfimgs = 12
    pageDivider = 0
    gallery.innerHTML = "";
    const searchedImg = searchInput.value;
    getSearchImages(searchedImg, numOfimgs)
})

document. querySelector("form").addEventListener('submit',(e)=>{
    e.preventDefault()
    if(searchInput.value) {
        gallery.innerHTML = "";
        const searchedImg = searchInput.value;
        getSearchImages(searchedImg, numOfimgs)
    }
})

loadMoreBtn.addEventListener("click", () => {
    if (searchInput.value == "") {
        pageDivider += 13;
        numOfimgs += 12
        getImages(numOfimgs)

    }
    else if (searchInput.value != "") {
        pageDivider += 13;
        numOfimgs += 12
        const searchedImg = searchInput.value;
        getSearchImages(searchedImg, numOfimgs)

    }
})

getImages()
async function getImages(numOfImgs) {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${numOfimgs}`, {
        method: "GET",
        headers: { accept: "application/json", authorization: pexelsApiKey }
    })
    gallery.innerHTML = "";
    const data = await response.json()
    if (numOfimgs == 12) createHTML(data.photos);
    else if (numOfImgs > 12) loadMoreImgs(pageDivider, data.photos)
}


async function getSearchImages(searchedImg, numOfImgs) {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${searchedImg}&per_page=${numOfImgs}`, {
        method: "GET",
        headers: { accept: "application/json", authorization: pexelsApiKey }
    })
    const data = await response.json();
    if (data.photos.length == 0) {
        gallery.innerHTML = ""
        noImgsFound.style.opacity = "1";
    }
    else if (numOfimgs == 12) {
        noImgsFound.style.opacity = "0";
        createHTML(data.photos);
    }
    else if (numOfImgs > 12) {
        noImgsFound.style.opacity = "0";
        loadMoreImgs(pageDivider, data.photos);
    }


}


function createHTML(photos) {
    gallery.innerHTML = ""
    photos.forEach((photo) => {
        gallery.innerHTML +=
            `<div class="item">
                <img src="${photo.src.medium}">
                    <h3>${photo.photographer}</h3>
                </div
            `
    })
}


function loadMoreImgs(pageDivider, photos) {
    photos = photos.filter((a, b) => b >= pageDivider);
    photos.forEach((photo) => {
        gallery.innerHTML +=
            `<div class="item">
                    <img src="${photo.src.medium}">
                        <h3>${photo.photographer}</h3>
                 </div
              `
    })
}