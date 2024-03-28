// Khởi tạo
var tempCart = [];
if(localStorage.getItem('lCart'))
	tempCart = JSON.parse(localStorage.getItem('lCart'));

function updateCart() {
	localStorage.setItem('lCart', JSON.stringify(tempCart));
}

displayCart(tempStorage, tempCart);
checkCart();

// Hiển thị sách ở Giỏ hàng
function displayCart(storage, tCart) {
	if(document.querySelector('.cart')) {
		const cart = document.querySelector('.cart');
		var temp = '';

		for(var i = 0; i < tCart.length; i++) {
			for(var j = 0; j < storage.length; j++) {
				if(tCart[i] == storage[j].id) {
					const book = `
						<div class="addBook row border-bottom py-2">
							<div class="col-md-4 d-flex flex-column gap-2">
								<div class="cover border align-self-center d-flex justify-content-center text-center"><img id="coverPreview" class="align-self-center" src="${storage[j].cover}"></div>
							</div>
							<div class="col-md-8">
								<div class="row">
									<div class="col-md-2 my-1">
										<label for="id" class="form-label">Mã</label>
										<input type="number" class="form-control" id="id" value="${storage[j].id}" disabled>
									</div>
									<div class="col-md-10 my-1">
										<label for="title" class="form-label">Tiêu đề</label>
										<input type="text" class="form-control" id="title" value="${storage[j].title}" disabled>
									</div>
									<div class="col-md-4 my-1">
										<label for="volume" class="form-label">Tập</label>
										<input type="number" class="form-control" id="volume" value="${storage[j].volume}" disabled>
									</div>
									<div class="col-md-4 my-1">
										<label for="price" class="form-label">Đơn giá</label>
										<div class="input-group">
											<input type="number" class="form-control" id="price" value="${storage[j].price}" disabled>
											<span class="input-group-text">đ</span>
										</div>
									</div>
									<div class="col-md-4 my-1">
										<label for="quantity" class="form-label">Số lượng</label>
										<div class="input-group">
											<input type="number" class="quantity form-control" id="quantity" value="1" onchange="sum(this.closest('.row')); inputControl(this); inputLimit(this)" required>
											<span class="input-group-text">/${storage[j].quantity}</span>
										</div>
									</div>
									<div class="col-md-6 my-1">
										<label for="total" class="form-label">Thành tiền</label>
										<div class="input-group">
											<input type="number" class="form-control" id="total" value="${storage[j].price}" disabled>
											<span class="input-group-text">đ</span>
										</div>
									</div>
									<div class="col-md-6 my-1 d-flex justify-content-end align-items-end gap-4">
										<button class="pay btn btn-success" id="b${storage[j].id}" onclick="payItem(this)">Thanh toán</button>
										<button class="btn btn-danger" id="b${storage[j].id}" onclick="removeItem(this)">Xóa</button>
									</div>
								</div>
							</div>
						</div>
					`;

					temp += book;

					break;
				}
			}
		}
		const button = `
			<div class="btnGroup d-flex flex-md-row flex-column justify-content-around pt-2 gap-2">
				<button class="payAll btn btn-success" onclick="payCart()">Thanh toán tất cả</button>
				<button class="btn btn-danger" onclick="removeCart()">Xóa tất cả</button>
			</div>
		`;
		if(temp != '') {
			temp += button;
			cart.innerHTML = temp;
		}

		loadLimit();
	}
}

// Đổi nút thêm/xóa (Trang chính)
function checkCart() {
	if(document.querySelectorAll('.btnCart')) {
		const button = document.querySelectorAll('.btnCart');
		button.forEach(e => {
			if(tempCart.includes(e.id.slice(1))) {
				e.addEventListener('click', removeFromCart);
				e.textContent = 'Xóa khỏi giỏ hàng';
				e.classList.toggle('btn-primary');
				e.classList.toggle('btn-secondary');
			} else
				e.addEventListener('click', addToCart);
		});
	}
	disAdd();
}

// Thêm vào giỏ hàng (Trang chính)
function addToCart() {
	for(var i = 0; i < tempStorage.length; i++){
		if(tempStorage[i].id == this.id.slice(1)) {
			tempCart.push(this.id.slice(1));
			break;
		}
	}

	const temp = document.querySelector(`#${this.id}`);
	temp.textContent = 'Xóa khỏi giỏ hàng';
	temp.classList.toggle('btn-primary');
	temp.classList.toggle('btn-secondary');
	this.removeEventListener('click', addToCart);
	this.addEventListener('click', removeFromCart);

	updateCart();
}

// Xóa khỏi giỏ hàng (Trang chính)
function removeFromCart() {
	const tempId = this.id.slice(1);

	for(var i = 0; i < tempCart.length; i++){
		if(tempCart[i] == tempId) {
			var tempC = tempCart[i];
			tempCart[i] = tempCart[0];
			tempCart[0] = tempC;
			tempCart.shift();
			break;
		}
	}
	for(var i = 0; i < tempCart.length - 1; i++){
		for(var j = i + 1; j < tempCart.length; j++){
			if(tempCart[i] > tempCart[j]) {
				var tempC = tempCart[i];
				tempCart[i] = tempCart[j];
				tempCart[j] = tempC;
			}
		}
	}

	const temp = document.querySelector(`#${this.id}`);
	temp.textContent = 'Thêm vào giỏ hàng';
	temp.classList.toggle('btn-primary');
	temp.classList.toggle('btn-secondary');
	this.removeEventListener('click', removeFromCart);
	this.addEventListener('click', addToCart);

	updateCart();
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

// Thanh toán 1 sách
function payItem(item) {
	for(var i = 0; i < tempStorage.length; i++){
		if(item.id.slice(1) == tempStorage[i].id) {
			tempStorage[i].quantity -= item.closest('.row').querySelector('#quantity').value;
			break;
		}
	}

	removeItem(item);
	updateStorage();
}

// Xóa 1 sách khỏi giỏ hàng (Giỏ hàng)
function removeItem(item) {
	const tempId = item.id.slice(1);

	for(var i = 0; i < tempCart.length; i++){
		if(tempCart[i] == tempId) {
			var temp = tempCart[i];
			tempCart[i] = tempCart[0];
			tempCart[0] = temp;
			tempCart.shift();
			break;
		}
	}

	if(item.closest('.addBook'))
		item.closest('.addBook').remove();

	checkEmpty();
	updateCart();
}

// Thanh toán tất cả
function payCart() {
	const book = document.querySelectorAll('.addBook');

	book.forEach(e => {
		const id = e.querySelector('#id').value;
		const quantity = e.querySelector('#quantity').value;

		for(var i = 0; i < tempStorage.length; i++){
			if(id == tempStorage[i].id) {
				tempStorage[i].quantity -= quantity;
				break;
			}
		}
	});

	updateStorage();
	removeCart();
}

// Vứt giỏ hàng
function removeCart() {
	localStorage.removeItem('lCart');
	tempCart = [];
	document.querySelector('.cart').remove();
	document.querySelector('.displayBook').innerHTML += '<div class="cart p-3"><br class="btnGroup"></div>';

	checkEmpty();
}

// Load limit
function loadLimit() {
	const temp = document.querySelectorAll('.quantity');

	temp.forEach(e => {
		inputLimit(e);
	});
}

//
function checkEmpty() {
	const temp = `
		<div class="text-center opacity-50"><i class="bi bi-cart4" style="font-size: 140px;"></i></div>
		<h2 class="text-center opacity-50">Chưa có sách nào</h2>
	`;

	if(!document.querySelector('.addBook')) {
		document.querySelector('.btnGroup').remove();
		document.querySelector('.cart').innerHTML = temp;
	}
}