// 1. Define your list of images here
const imageList = [
    'pictures/uke4.jpg',
    'pictures/uke5.jpg',
    'pictures/uke6.jpg',
    'pictures/uke7.jpg',
    'pictures/uke8.jpg',
    'pictures/uke9.jpg',
    'pictures/uke10.jpg',
    'pictures/uke11.jpg',
    'pictures/uke12.jpg',
    'pictures/uke13.jpg',
];

let currentIndex = -1;

function showPicture(imagePath) {
    const imgElement = document.getElementById('displayedImage');
    
    // Update the global index to match the clicked image
    currentIndex = imageList.indexOf(imagePath);
    
    imgElement.src = imagePath;
    imgElement.style.display = 'inline-block';
}

function changePicture(step) {
    // If no image is selected yet, start at the first one
    if (currentIndex === -1) {
        currentIndex = 0;
    } else {
        // Move index forward or backward
        currentIndex += step;

        // Loop logic: If at the end, go to start. If at start, go to end.
        if (currentIndex >= imageList.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = imageList.length - 1;
        }
    }
    
    // Display the new image
    const imgElement = document.getElementById('displayedImage');
    imgElement.src = imageList[currentIndex];
    imgElement.style.display = 'inline-block';
}

function toggleFullscreen() {
    const img = document.getElementById('displayedImage');
    img.classList.toggle('fullscreen');
}

function logoutFunction(){
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'dashboard.html';
}
function backFunction(){
    window.location.href = 'dashboard.html';
}