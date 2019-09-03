console.log('hello?');

const openImage = (filepath) => {
	console.log('click!');
	let selectedImageContainer = document.getElementById('selected-image-container');
	selectedImageContainer.style.height = "100vh";
	selectedImageContainer.style.top = "0vh";
	//selectedImageContainer.innerHTML = "<img src=\"" + filepath + "\" id=\"selected-image\">";
	let selectedImage = document.getElementById('selected-image');
	selectedImage.src = filepath;
	console.log(selectedImage);
};

const closeImage = () => {
	let selectedImageContainer = document.getElementById('selected-image-container');
	selectedImageContainer.style.height = "0vh";
	selectedImageContainer.style.top = "50vh";
}

const getImages = function () {
		document.getElementById('image-viewer').innerHTML = "";
		fetch('./get_images.php', {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				
				res.forEach(imginfo => {
					let slideHTML = "";
					slideHTML += "<div class=\"slide\" onclick=\"openImage('" + imginfo.filepath + "')\">";
					slideHTML += "<button class=\"delete-slide-button\" onclick=\"deleteImage('" + imginfo.filepath + "', event)\">X</button>";
					slideHTML += "<h2>" + imginfo.filepath.substring(8)+ "</h2>";
					slideHTML += "<img src=\"" + imginfo.filepath + "\">";
					slideHTML += "<div class=\"slide-info\">";
					slideHTML += "<p>file-path: " + imginfo.filepath + "</p>";
					slideHTML += "<p>file-size: " + imginfo.filesize + "</p>";
					slideHTML += "<p>file-type: " + imginfo.filetype + "</p>";
					slideHTML += "<p>upload-date: " + imginfo.uploadDatetime + "</p>";
					slideHTML += "</div></div";
					document.getElementById('image-viewer').innerHTML += slideHTML;
				});
			});	

		let slides = document.getElementsByClassName('slide');
		console.log(slides.length);

		[].forEach.call(slides, function(slideNode) {
			slideNode.addEventListener('click', function(e) {
				console.log(this);
			});
		});
	};


const deleteImage = function (filepath, e) {
	console.log('about to delete!');
	e.stopPropagation();
	if (window.confirm('Delete this image?')) {
		fetch('./delete.php?filepath=' + filepath, {
			method: 'GET'
		})
			.then(res => getImages());
	}
}


window.onload = function () {

	
	getImages();

	document.getElementById('submit-button').addEventListener('click', function (e) {
		e.preventDefault();
		const formdata = new FormData(document.getElementById('image-uploader'));
		fetch('./upload.php', {
			method: 'POST',
			body: formdata
		})
			.then(res => getImages());
	});

	document.getElementById('close-selected-image-button').addEventListener('click', closeImage);

	//document.getElementById('get-button').addEventListener('click', function (e) {
	//	getImages();
	//});

	
};

