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
										<label for="price" class="form-label">Giá</label>
										<div class="input-group">
											<input type="number" class="form-control" id="price" value="${storage[j].price}" disabled>
											<span class="input-group-text">đ</span>
										</div>
									</div>
									<div class="col-md-4 my-1">
										<label for="quantity" class="form-label">Số lượng</label>
										<input type="number" class="form-control" id="quantity" value="1" value="${storage[j].quantity}" onchange="sum(this.closest('.row'))" required>
									</div>
									<div class="col-md-8 my-1">
										<label for="total" class="form-label">Thành tiền</label>
										<div class="input-group">
											<input type="number" class="form-control" id="total" value="${storage[j].price * storage[j].quantity}" disabled>
											<span class="input-group-text">đ</span>
										</div>
									</div>
									<div class="col-md-4 my-1 d-flex justify-content-end align-items-end gap-4">
										<button class="btn btn-success" id="b${storage[j].id}" onclick="payItem(this)">Thanh toán</button>
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
			<div class="d-flex justify-content-around py-2">
				<button class="btn btn-success">Thanh toán tất cả</button>
				<button class="btn btn-danger" onclick="removeCart()">Xóa tất cả</button>
			</div>
		`;
		if(temp != '')
			temp += button;

		cart.innerHTML = temp;
	}
}

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

function sum(item) {
	const priceInput = item.querySelector('#price');
	const quantityInput = item.querySelector('#quantity');
	const totalInput = item.querySelector('#total');

	totalInput.value = priceInput.value * quantityInput.value;
}

function payItem(item) {
	for(var i = 0; i < tempStorage.length; i++){
		if(item.id.slice(1) == tempStorage[i].id) {
			tempStorage[i].quantity -= item.closest('.row').querySelector('#quantity').value;
		}
	}

	removeItem(item);
	updateStorage();
}

function removeItem(item) {
	const tempId = item.id.slice(1);

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

	item.closest('.addBook').remove();

	updateCart();
}

function payCart() {
	removeCart();
}
function removeCart() {
	localStorage.removeFromCart('lCart');
	tempCart = [];
	document.querySelector('.cart').remove();
	document.querySelector('.displayBook').innerHTML += '<div class="cart mx-2"></div>';
}