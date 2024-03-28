const header = `
	<div class="d-flex align-items-end gap-2">
		<div class="logo"></div>
		<a class="m-0 h1 link-dark link-underline-opacity-0" href="/shuuya-bookstore">Shuuya's Bookstore</a>
	</div>
	<div class="d-flex gap-3">
		<a class="iconCursor d-flex flex-column justify-content-center link-dark link-underline-opacity-0" href="/shuuya-bookstore/kho-sach">
			<i class="bi bi-journals icon text-center"></i>
			<span class="fontSmall">Kho sách</span>
		</a>
		<a class="iconCursor d-flex flex-column justify-content-center link-dark link-underline-opacity-0" href="/shuuya-bookstore/gio-hang">
			<i class="bi bi-cart4 icon text-center"></i>
			<span class="fontSmall">Giỏ hàng</span>
		</a>
	</div>
`;

const headerCreate = document.createElement('header');
headerCreate.innerHTML = header;
headerCreate.classList.add('bg-white', 'border-bottom', 'border-4', 'px-5', 'py-2', 'd-flex', 'flex-wrap', 'justify-content-between', 'align-items-center', 'gap-2', 'position-sticky', 'top-0', 'z-3')
document.querySelector("body").insertBefore(headerCreate, document.querySelector("body").children[0]);



const footer = `
	<div class="d-flex flex-wrap gap-3 justify-content-around">
		<div class="d-flex flex-column gap-2">
			<div class="d-flex align-items-end gap-2">
				<div class="logo"></div>
				<h1 class="m-0 text-wrap">Shuuya's Bookstore</h1>
			</div>
			<p>Địa chỉ: Nơi nào đó trên Trái Đất</p>
			<p>Shuuya's Bookstore nhận đặt hàng trực tuyến và giao hàng tận nơi</p>
			<div class="social d-flex justify-content-around gap-3">
				<div class="icon d-flex justify-content-center text-white"><i class="bi bi-facebook"></i></div>
				<div class="icon d-flex justify-content-center text-white"><i class="bi bi-youtube"></i></div>
				<div class="icon d-flex justify-content-center text-white"><i class="bi bi-instagram"></i></div>
				<div class="icon d-flex justify-content-center text-white"><i class="bi bi-twitter-x"></i></div>
			</div>
		</div>
		<!-- <div class="border"></div> -->
		<div class="d-flex flex-column gap-3">
			<div class="d-flex flex-wrap justify-content-sm-around gap-3">
				<div class="d-flex flex-column gap-2">
					<h2>DỊCH VỤ</h2>
					<p>Điều khoản sử dụng</p>
					<p>Chính sách bảo mật thông tin cá nhân</p>
					<p>Chính sách bảo mật thanh toán</p>
					<p>Giới thiệu Shuuya's Bookstore</p>
					<p>Hệ thống trung tâm - nhà sách</p>
				</div>
				<div class="d-flex flex-column gap-2">
					<h2>HỖ TRỢ</h2>
					<p>Chính sách đổi - trả - hoàn tiền</p>
					<p>Chính sách bảo hành - bồi hoàn</p>
					<p>Chính sách vận chuyển</p>
					<p>Chính sách khách hàng</p>
					<p>Phương thức thanh toán</p>
				</div>
			</div>
			<div class="d-flex flex-column gap-2">
				<h2>LIÊN HỆ</h2>
				<div class="d-flex flex-wrap justify-content-sm-around gap-2">
					<div class="d-flex align-items-end gap-1">
						<i class="bi bi-geo-alt-fill icon"></i>
						<p>Đâu đó trên Trái Đất</p>
					</div>
					<div class="d-flex align-items-end gap-1">
						<i class="bi bi-envelope-fill icon"></i>
						<p>shuuyabookstore@gmail.com</p>
					</div>
					<div class="d-flex align-items-end gap-1">
						<i class="bi bi-telephone-fill icon"></i>
						<p>1900110923</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="textBot text-center">Website này là bài kiểm tra để không bị -30% lương. Không chính thức kinh doanh... Hay là có nhỉ?</div>
`;

const footerCreate = document.createElement('footer');
footerCreate.innerHTML = footer;
footerCreate.classList.add('bg-white', 'border-top', 'border-3', 'p-5', 'pb-2', 'd-flex', 'flex-column', 'gap-4')
document.querySelector("body").appendChild(footerCreate);