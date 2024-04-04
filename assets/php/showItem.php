<?php
	function showBook($book, $cart) {
		if($book->num_rows > 0) {
			while($row = $book->fetch_assoc()) {
				$check = 0;
				foreach ($cart as $item) {
					if($item["id"] == $row["id"]) {
						$check = 1;
						break;
					}
				}
				printBook($row, $check);
			}
		} else {
			echo '
				<div class="d-flex justify-content-center opacity-50"><img width="180" height="120" src="assets/img/book.png"></div>
				<h2 class="text-center opacity-50">Chưa có sách nào</h2>
			';
		}
	}
	function printBook($row, $check) {
		if($row["quantity"] > 0)
			$status = 'Green';
		else
			$status = 'Red';

		// $coverImg = 'data:image/*;charset=utf8;base64,' . base64_encode($row["cover"]);

		echo '
			<div class="book col bg-white border p-2 d-flex flex-column flex-grow-0 justify-content-center gap-2 position-relative rounded">
				<div class="cover align-self-center d-flex justify-content-center position-relative text-center">
					<img class="align-self-center" src="assets/php/displayCover.php?id='.$row["id"].'">
					<span class="volumeText mt-1 p-1 position-absolute bottom-0 end-0 rounded">'.$row["volume"].'</span>
				</div>
				<div class="title border-top" title="'.$row["title"].'">'.$row["title"].'</div>
				<div class="price">'.$row["price"].'</div>
				<form class="row px-3" method="POST">
					<button class="btnCart col-12 btn btn-primary" data-quantity="'.$row["quantity"].'" data-check="'.$check.'" type="submit" name="addCart" value="'.$row["id"].'">Thêm vào giỏ hàng</button>
				</form>
				<span class="status'.$status.' mt-1 p-1 position-absolute top-0 rounded"></span>
			</div>
		';
	}
?>
<?php function displayBook($book) {
	if($book->num_rows > 0) {
		while($row = $book->fetch_assoc()) {
			// $coverImg = 'data:image/*;charset=utf8;base64,' . base64_encode($row["cover"]);

			echo '
				<tr class="text-center">
					<td>'.$row["id"].'</td>
					<td><div class="cover mx-auto"><img src="../assets/php/displayCover.php?id='.$row["id"].'"></div></td>
					<td class="text-start">'.$row["title"].'</td>
					<td>'.$row["volume"].'</td>
					<td class="text-end">'.$row["price"].'đ</td>
					<td>'.$row["quantity"].'</td>
					<td>
						<button class="btn btn-primary mb-1 text-nowrap" onclick="editBook(this.closest(\'tr\'))"><i class="bi bi-pencil-square"></i> Chỉnh sửa</button>
						<form method="POST">
							<button class="btn btn-danger text-nowrap" value="'.$row["id"].'" type="submit" name="delete"><i class="bi bi-trash3-fill"></i> Loại bỏ</button>
						</form>
					</td>
				</tr>
			';
		}
	}
} ?>
<?php function displayCart($conn, $book, $cart) {
	if($cart->num_rows > 0) {
		while($item = $cart->fetch_assoc()) {
			$temp = $item["id"];
			$temp2 = $conn->query("SELECT * FROM book WHERE id = '$temp'");
			$row = $temp2->fetch_assoc();

			// $coverImg = 'data:image/*;charset=utf8;base64,' . base64_encode($row["cover"]);

			echo '
				<form class="addBook row border-bottom py-2" method="POST">
					<div class="col-md-4 d-flex flex-column gap-2">
						<div class="cover border align-self-center d-flex justify-content-center text-center"><img id="coverPreview" class="align-self-center" src="../assets/php/displayCover.php?id='.$row["id"].'"></div>
					</div>
					<div class="col-md-8">
						<div class="row">
							<div class="col-md-2 my-1">
								<label for="id" class="form-label">Mã</label>
								<input type="number" class="form-control" id="id" value="'.$row["id"].'" disabled>
							</div>
							<div class="col-md-10 my-1">
								<label for="title" class="form-label">Tiêu đề</label>
								<input type="text" class="form-control" id="title" value="'.$row["title"].'" disabled>
							</div>
							<div class="col-md-4 my-1">
								<label for="volume" class="form-label">Tập</label>
								<input type="number" class="form-control" id="volume" value="'.$row["volume"].'" disabled>
							</div>
							<div class="col-md-4 my-1">
								<label for="price" class="form-label">Đơn giá</label>
								<div class="input-group">
									<input type="number" class="form-control" id="price" value="'.$row["price"].'" disabled>
									<span class="input-group-text">đ</span>
								</div>
							</div>
							<div class="col-md-4 my-1">
								<label for="quantity" class="form-label">Số lượng</label>
								<div class="input-group">
									<input type="number" class="quantity form-control" id="quantity" value="'.$item["quantity"].'" name="quantity" onchange="sum(this); inputControl(this); inputLimit(this); updateQuantity(this);" required>
									<span class="input-group-text">/'.$row["quantity"].'</span>
								</div>
							</div>
							<div class="col-md-12 my-1">
								<label for="total" class="form-label">Thành tiền</label>
								<div class="input-group">
									<input type="number" class="form-control" id="total" value="'.$row["price"].'" disabled>
									<span class="input-group-text">đ</span>
								</div>
							</div>
							<div class="col-md-6 my-1 d-flex justify-content-end align-items-end">
								<button class="update btn btn-primary" value="'.$row["id"].'" name="update" hidden>Cập nhật</button>
							</div>
							<div class="col-md-6 my-1 d-flex justify-content-end align-items-end gap-4">
								<button class="pay btn btn-success" value="'.$row["id"].'" name="payItem">Thanh toán</button>
								<button class="btn btn-danger" value="'.$row["id"].'" name="removeFromCart">Xóa</button>
							</div>
						</div>
					</div>
				</form>
			';
		}
		echo '
			<form class="btnGroup d-flex flex-md-row flex-column justify-content-around pt-2 gap-2" method="POST">
				<button class="payCart btn btn-success" type="submit" name="payCart">Thanh toán tất cả</button>
				<button class="btn btn-danger" type="submit" name="removeCart">Xóa tất cả</button>
			</form>
		';
	} else {
		echo '
			<div class="text-center opacity-50"><i class="bi bi-cart4" style="font-size: 140px;"></i></div>
			<h2 class="text-center opacity-50">Chưa có sách nào</h2>
		';
	}
} ?>