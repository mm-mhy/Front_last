// 文件数量
var fileNumber = 12;

// 获取文件盒子容器
var modelFilesContainer = document.getElementById("model-files");

// 图像URL列表
var imageUrls = [
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
    "../image/888.png",
];

// 动态生成文件盒子
for (var i = 1; i <= fileNumber; i++) {
    // 创建文件盒子元素
    var fileBox = document.createElement("div");
    fileBox.className = "file-box";

    // 创建文件图像元素
    var fileImgContainer = document.createElement("div");
    fileImgContainer.className = "file-img-container";
    fileImgContainer.style.backgroundImage = "url('" + imageUrls[i - 1] + "')";



    // 创建图标容器
    var iconsContainer = document.createElement("div");
    iconsContainer.className = "icons";

    // 创建编辑图标
    var editIcon = document.createElement("img");
    editIcon.className = "edit-icon";
    editIcon.src = "../image/rename.png";
    editIcon.alt = "Edit Icon";

    // 创建下载图标
    var downloadIcon = document.createElement("img");
    downloadIcon.className = "download-icon";
    downloadIcon.src = "../image/download.png";
    downloadIcon.alt = "Download Icon";

    // 将编辑图标和下载图标添加到图标容器
    iconsContainer.appendChild(editIcon);
    iconsContainer.appendChild(downloadIcon);

    // 创建文件名元素
    var fileName = document.createElement("div");
    fileName.className = "file-name";
    fileName.textContent = "File " + i;

    // 将文件盒子添加到文件盒子容器
    modelFilesContainer.appendChild(fileBox);

    // 将文件图像元素添加到文件盒子
    fileBox.appendChild(fileImgContainer);

    // 将图标容器添加到文件图像元素
    fileImgContainer.appendChild(iconsContainer);

    // 将文件名元素添加到文件盒子
    fileBox.appendChild(fileName);


    // 为编辑图标绑定点击事件
    editIcon.addEventListener("click", function (event) {
        // console.log(222);
        // 获取当前点击的编辑图标
        var editIconClicked = event.target;

        // 获取与编辑图标关联的文件名元素
        var fileNameElement = editIconClicked.parentNode.parentNode.nextElementSibling;

        // 创建一个新的文本框元素
        var fileEditTextbox = document.createElement("input");
        fileEditTextbox.className = "file-edit-textbox";
        fileEditTextbox.type = "text";
        fileEditTextbox.value = fileNameElement.textContent;

        // 替换文件名元素为文本框
        fileNameElement.parentNode.replaceChild(fileEditTextbox, fileNameElement);

        // 为文本框添加焦点，并选中所有文本
        fileEditTextbox.focus();
        fileEditTextbox.select();

        // 为文本框绑定事件，当用户完成编辑时触发
        fileEditTextbox.addEventListener("blur", function () {
            // 创建一个新的文件名元素
            var newFileNameElement = document.createElement("div");
            newFileNameElement.className = "file-name";
            newFileNameElement.textContent = fileEditTextbox.value;

            // 替换文本框为新的文件名元素
            fileEditTextbox.parentNode.replaceChild(newFileNameElement, fileEditTextbox);
        });

        // 同样，当用户按下回车键时，也可以保存新的文件名
        fileEditTextbox.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                // 阻止默认的表单提交行为
                event.preventDefault();

                // 使文本框失去焦点，触发blur事件
                fileEditTextbox.blur();
            }
        });
    });
    downloadIcon.addEventListener("click", function (event) {
        // 获取当前点击的下载图标
        var downloadIconClicked = event.target;

        // 获取与下载图标关联的文件名和图片元素
        var fileNameElement = downloadIconClicked.parentNode.parentNode.nextElementSibling;
        // var fileImgElement = downloadIconClicked.parentNode.parentNode;

        // 获取文件名和fileImgElement的背景图片URL
        var fileName = fileNameElement.textContent;
        var fileImage = downloadIconClicked.parentNode.parentNode.style.backgroundImage;
        // console.log(fileImage);


        // 设置下载弹窗中的图片和文件名
        var downloadFileImg = document.querySelector(".download-window .fileImg");
        var downloadFileName = document.querySelector(".download-window .fileName");
        // console.log(fileImage);
        downloadFileImg.style.backgroundImage = fileImage;
        downloadFileName.textContent = fileName;

        showDownload();
    });

}

