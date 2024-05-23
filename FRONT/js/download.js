var closeDownloadWindowButton = document.querySelector(".download-window .close-btn");

closeDownloadWindowButton.addEventListener("click", function () {
    closeDownload();

});

function showDownload() {
    var downloadWindow = document.querySelector(".download-window");
    downloadWindow.style.display = "block";
}

function closeDownload() {
    var downloadWindow = document.querySelector(".download-window");
    downloadWindow.style.display = "none";
}