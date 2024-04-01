<?php function showBook($result) {
	if($result->num_rows > 0) {
		foreach ($result as $row) {
			if($row["quantity"] > 0)
				$status = 'Green';
			else
				$status = 'Red';

			$coverImg = 'data:image/*;charset=utf8;base64,' . base64_encode($row["cover"]);

			echo '
				<div class="book col bg-white border p-2 d-flex flex-column flex-grow-0 justify-content-center gap-2 position-relative rounded">
					<div class="cover align-self-center d-flex justify-content-center position-relative text-center">
						<img class="align-self-center" src="'.$coverImg.'">
						<span class="volumeText mt-1 p-1 position-absolute bottom-0 end-0 rounded">'.$row["volume"].'</span>
					</div>
					<div class="title border-top" title="'.$row["title"].'">'.$row["title"].'</div>
					<div class="price">'.$row["price"].'</div>
					<button class="btnCart btn btn-primary" id="b'.$row["id"].'">Thêm vào giỏ hàng</button>
					<span class="status'.$status.' mt-1 p-1 position-absolute top-0 rounded"></span>
				</div>
			';
		}
	} else {
		echo '
			<div class="d-flex justify-content-center opacity-50"><img width="180" height="120" src="assets/img/book.png"></div>
			<h2 class="text-center opacity-50">Chưa có sách nào</h2>
		';
	}
} ?>
<?php function displayBook($result) {
	if($result->num_rows > 0) {
		foreach ($result as $row) {
			$coverImg = 'data:image/*;charset=utf8;base64,' . base64_encode($row["cover"]);

			echo '
				<tr class="text-center" id="b'.$row["id"].'">
					<td>'.$row["id"].'</td>
					<td><div class="cover mx-auto"><img src="'.$coverImg.'"></div></td>
					<td class="text-start">'.$row["title"].'</td>
					<td>'.$row["volume"].'</td>
					<td class="text-end">'.$row["price"].'đ</td>
					<td>'.$row["quantity"].'</td>
					<td>
						<div class="text-nowrap" onclick="editBook(this.closest(\'tr\'))"><i class="bi bi-pencil-square"></i> Chỉnh sửa</div>
						<div class="text-nowrap" onclick="removeBook(this.closest(\'tr\'))"><i class="bi bi-trash3-fill"></i> Loại bỏ</div>
					</td>
				</tr>
			';
		}
	}
} ?>