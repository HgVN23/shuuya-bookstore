setBtnCart();

// Vô hiệu hóa Thêm vào giỏ khi hết hàng
// Check thêm hoặc xóa hàng khỏi Giỏ
function setBtnCart() {
	if(document.querySelectorAll('.btnCart')) {
		const button = document.querySelectorAll('.btnCart');
		button.forEach(e => {
			if(e.dataset.quantity == 0) {
				e.disabled = true;
			}
			if(e.dataset.check == 1) {
				e.name = "removeFromCart"
				e.textContent = 'Xóa khỏi giỏ hàng';
				e.classList.toggle('btn-primary');
				e.classList.toggle('btn-secondary');
			} else {
				e.name = "addToCart"
			}
		});
	}
}

// Thành tiền 1 sách = Đơn giá * Số lượng
function sum(item) {
	const priceInput = item.querySelector('#price');
	const quantityInput = item.querySelector('#quantity');
	const totalInput = item.querySelector('#total');

	const temp = setTimeout(function() {
		totalInput.value = priceInput.value * quantityInput.value;
	}, 200);
}

// Giới hạn Input số lượng
function inputLimit(item) {
	const limit = item.closest('div').querySelector('span').textContent.slice(1);
	const btnControl = item.closest('.row').querySelector('.pay');
	const btnList = document.querySelectorAll('.pay');

	if(item.value > limit)
		item.value = limit;

	if(item.value == 0)
		btnControl.disabled = true;
	else
		btnControl.disabled = false;

	var check = false;
	for(var i = 0; i < btnList.length; i++) {
		if(btnList[i].disabled) {
			check = true;
			break;
		}
	}
	if(check)
		document.querySelector('.payAll').disabled = true;
	else
		document.querySelector('.payAll').disabled = false;
}