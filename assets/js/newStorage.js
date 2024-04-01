// Khởi tạo
const idInput = document.querySelector('#id');
const coverInput = document.querySelector('#coverPreview');
const titleInput = document.querySelector('#title');
const volumeInput = document.querySelector('#volume');
const priceInput = document.querySelector('#price');
const quantityInput = document.querySelector('#quantity');

// Preview ảnh khi input
if(document.querySelector('input#cover')) {
	const iCover = document.querySelector('input#cover');
	iCover.onchange = () => {
		const [file] = cover.files;
		if(file) {
			iCover.closest('form').querySelector('img').src = URL.createObjectURL(file);
		}
		else
			iCover.closest('form').querySelector('img').src = 'https://cdn.discordapp.com/attachments/677761423870525442/1222854468450910298/coverNull.png?ex=6617baf8&is=660545f8&hm=fdb5c8f6b26fb95b20298281d5f7e9989e74dd8f4e7cf92228dbf68f415d51eb&';
	}
}

// Ngăn không Input số âm
function inputControl(input) {
	if(input.value < 0)
		input.value = 0;
}