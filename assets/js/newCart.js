setBtnCart();
loadLimit();

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
	const itemRow = item.closest('.row');
	const priceInput = itemRow.querySelector('#price');
	const quantityInput = itemRow.querySelector('#quantity');
	const totalInput = itemRow.querySelector('#total');

	const time = setTimeout(function() {
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
		document.querySelector('.payCart').disabled = true;
	else
		document.querySelector('.payCart').disabled = false;
}

// Load limit
function loadLimit() {
	const temp = document.querySelectorAll('.quantity');

	temp.forEach(e => {
		inputLimit(e);
	});
}

function updateQuantity(item) {
	const itemRow = item.closest('.row');
	itemRow.querySelector('.update').hidden = false;
	itemRow.querySelector('.pay').disabled = true;
	itemRow.closest('.cart').querySelector('.payCart').disabled = true;
}