class Book {
	constructor(id, cover, title, volume, price, quantity) {
		this.id = id;
		this.cover = cover;
		this.title = title;
		this.volume = volume;
		this.price = price;
		this.quantity = quantity;
	}
}

// Tạo temp arr và add localStorage vào nếu có
var tempStorage = [];
if(localStorage.getItem('lStorage'))
	tempStorage = JSON.parse(localStorage.getItem('lStorage'));

// const storage = [
// 	new Book(0, 'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg', 'Tonikaku Kawaii', 18, 160000, 2),
// 	// new Book(0, 'https://mangadex.org/covers/30f3ac69-21b6-45ad-a110-d011b7aaadaa/0dddf687-95ec-4e88-acd7-cd90a4c9749a.jpg', 'Tonikaku Kawaii', 18, 160000, 2),
// 	new Book(1, 'https://mangadex.org/covers/188e4f34-a80c-4a91-b54e-69572e8ed4d5/43f01b64-35f1-4938-afa5-4767f6401294.jpg', 'Saint Cecilia and Pastor Lawrence', 23, 160000, 0)
// ]

// Update lại localStorage
function updateStorage() {
	localStorage.setItem('lStorage', JSON.stringify(tempStorage));
}

// Load sách lúc đầu
const idInput = document.querySelector('#id');
const coverInput = document.querySelector('#coverPreview');
const titleInput = document.querySelector('#title');
const volumeInput = document.querySelector('#volume');
const priceInput = document.querySelector('#price');
const quantityInput = document.querySelector('#quantity');

showBook(tempStorage);
displayBook(tempStorage);

if(document.querySelector('form')) {
	var form = document.querySelector('form');
	form.addEventListener('submit', addBook);
	form.addEventListener('reset', resetForm);
}

// Hiển thị sách ở Trang chủ
function showBook(storage) {
	if(document.querySelector('.show')) {
		const show = document.querySelector('.show');

		storage.forEach(e => {
			var status;
			if(e.quantity != 0)
				status = 'Green';
			else
				status = 'Red';
			
			const book = `
				<div class="book col bg-white border p-2 d-flex flex-column flex-grow-0 justify-content-center gap-2 position-relative rounded">
					<div class="cover align-self-center d-flex justify-content-center position-relative text-center">
						<img class="align-self-center" src="${e.cover}">
						<span class="volumeText mt-1 p-1 position-absolute bottom-0 end-0 rounded">${e.volume}</span>
					</div>
					<div class="title border-top" title="${e.title}">${e.title}</div>
					<div class="price">${e.price}</div>
					<button class="btnCart btn btn-primary" id="b${e.id}">Thêm vào giỏ hàng</button>
					<span class="status${status} mt-1 p-1 position-absolute top-0 rounded"></span>
				</div>
			`;

			show.innerHTML += book;
		});
	}
}

// Hiển thị sách ở Kho sách
function displayBook(storage) {
	if(document.querySelector('.display')) {
		const display = document.querySelector('.display');
		var temp = '';

		storage.forEach(e => {
			const tDRow = `
				<tr class="text-center" id="b${e.id}">
					<td>${e.id}</td>
					<td class="cover text-center"><img src="${e.cover}"></td>
					<td class="text-start">${e.title}</td>
					<td>${e.volume}</td>
					<td class="text-end">${e.price}đ</td>
					<td>${e.quantity}</td>
					<td>
						<div class="text-nowrap" onclick="editBook(this.closest('tr'))"><i class="bi bi-pencil-square"></i> Chỉnh sửa</div>
						<div class="text-nowrap" onclick="removeBook(this.closest('tr').id.slice(1))"><i class="bi bi-trash3-fill"></i> Loại bỏ</div>
					</td>
				</tr>
			`;

			temp += tDRow;
		});
		
		display.innerHTML = temp;

		newId();
	}
}

// Preview ảnh khi input
if(document.querySelector('input#cover')) {
	const iCover = document.querySelector('input#cover');
	iCover.onchange = () => {
		/*const [file] = cover.files;
		if (file) {
			iCover.closest('form').querySelector('img').src = URL.createObjectURL(file);
		}*/
		iCover.closest('form').querySelector('img').src = iCover.value;
	}
}

// Biến đổi ảnh thành Data
/*function toDataURL(src, coverData){
	var image = new Image();
	image.crossOrigin = 'Anonymous';
	image.onload = function() {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.height = this.naturalHeight;
		canvas.width = this.naturalWidth;
		context.drawImage(this, 0, 0);
		var dataURL = canvas.toDataURL();
		coverData = dataURL;
	};
	image.src = src;
}*/

// Ngăn Reload lại web khi Submit thành công
if(document.querySelector('form'))
	document.querySelector('form').addEventListener('submit', handleForm);

function handleForm(event) {
	event.preventDefault();
}

// Reset Form
function resetForm() {
	form.querySelector('button[type=reset]').click();
	form.querySelector('img').src = "../assets/img/coverNull.png";
	form.removeEventListener('submit', editConfirm);
	form.addEventListener('submit', addBook);

	var temp = setTimeout(newId, 100)
}

// Submit Form aka Push vào kho sách
function addBook() {
	/*var cover = toDataURL(img.src, function(dataURL) {
		console.log(dataURL);
	});*/

	const temp = new Book(idInput.value, coverInput.src, titleInput.value, volumeInput.value, priceInput.value, quantityInput.value);
	tempStorage.push(temp);

	displayBook(tempStorage);
	updateStorage();

	resetForm();
}

//Remove Book khỏi Kho
function removeBook(id) {
	for(var i = 0; i < tempStorage.length; i++){
		if(tempStorage[i].id == id) {
			var temp = tempStorage[i];
			tempStorage[i] = tempStorage[0];
			tempStorage[0] = temp;
			tempStorage.shift();
			break;
		}
	}
	for(var i = 0; i < tempStorage.length - 1; i++){
		for(var j = i + 1; j < tempStorage.length; j++){
			if(tempStorage[i].id > tempStorage[j].id) {
				var temp = tempStorage[i];
				tempStorage[i] = tempStorage[j];
				tempStorage[j] = temp;
			}
		}
	}
	displayBook(tempStorage);
	updateStorage();

	resetForm();
}

//Chỉnh sửa Book
function editBook(tr) {
	idInput.value = tr.querySelector('td:nth-child(1)').textContent;
	titleInput.value = tr.querySelector('td:nth-child(3)').textContent;
	volumeInput.value = tr.querySelector('td:nth-child(4)').textContent;
	var temp = tr.querySelector('td:nth-child(5)').textContent;
	priceInput.value = temp.slice(0 , temp.length - 1);
	quantityInput.value = tr.querySelector('td:nth-child(6)').textContent;

	form.removeEventListener('submit', addBook);
	form.addEventListener('submit', editConfirm);

	form.parentElement.scrollIntoView();
}

function editConfirm() {
	for(var i = 0; i < tempStorage.length; i++){
		if(tempStorage[i].id == idInput.value) {
			tempStorage[i].title = titleInput.value;
			tempStorage[i].volume = volumeInput.value;
			tempStorage[i].price = priceInput.value;
			tempStorage[i].quantity = quantityInput.value;
			document.querySelector(`tr[id=b${tempStorage[i].id}]`).scrollIntoView();
			break;
		}
	}

	displayBook(tempStorage);
	updateStorage();

	resetForm();
}

// Hiện thị mã mới
function newId() {
	if(tempStorage.length == 0) {
		idInput.value = 0;
	} else
		idInput.value = parseInt(tempStorage[tempStorage.length - 1].id) + 1;
}

// Vô hiệu hóa Thêm vào giỏ khi hết hàng
function disAdd() {
	const button = document.querySelectorAll('.btnCart');
	button.forEach(e => {
		for(var i = 0; i < tempStorage.length; i++) {
			if(tempStorage[i].id == e.id.slice(1) && tempStorage[i].quantity == 0) {
				e.disabled = true;
			}
		}
	});
}