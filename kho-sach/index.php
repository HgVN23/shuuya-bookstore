<?php include '../assets/php/db.php'; ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="../assets/img/logo.png">
	<meta name="theme-color" content="#000bff">

	<title>Shuuya's Bookstore | Kho sách</title>
	<meta name="title" content="Shuuya's Bookstore">
	<meta name="description" content="Bài kiểm tra">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:site_name" content="Shuuya's Bookstore">
	<meta property="og:url" content="https://hgvn23.github.io/shuuya-bookstore/">
	<meta property="og:title" content="Shuuya's Bookstore | Kho sách">
	<meta property="og:description" content="Bài kiểm tra">
	<meta property="og:image" content="https://raw.githubusercontent.com/HgVN23/shuuya-bookstore/main/assets/img/thumbnail.png">

	<!-- Bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

	<!-- CSS -->
	<link rel="stylesheet" href="../assets/main.css">

	<!-- JS -->
	<!-- <script type="text/javascript" src="../assets/js/extends.js" defer></script> -->
	<!-- <script type="text/javascript" src="../assets/js/storage.js" defer></script> -->
	<!-- <script type="text/javascript" src="../assets/js/cart.js" defer></script> -->
	<script type="text/javascript" src="../assets/js/newStorage.js" defer></script>
</head>
<body>
	<?php include '../assets/php/header.php'; ?>
	<section class="d-flex justify-content-center">
		<div class="displayBook bg-white mx-4 my-3 container rounded">
			<div class="header d-flex align-items-end gap-2 border-bottom border-2 py-1">
				<i class="bi bi-pencil-square icon"></i>
				<h3 class="m-0">Cập nhật sách</h3>
			</div>
			<form class="addBook row mt-2" method="POST">
				<div class="col-md-4 d-flex flex-column gap-2">
					<div>
						<label for="cover" class="form-label">Ảnh bìa</label>
						<input class="form-control" type="file" id="cover" name="coverImg" accept="image/*">
						<!-- <input class="form-control" type="text" id="cover" accept="image/*" placeholder="Link ảnh..."> -->
					</div>
					<div class="cover border mb-2 align-self-center d-flex justify-content-center text-center"><img id="coverPreview" class="align-self-center" src="https://cdn.discordapp.com/attachments/677761423870525442/1222854468450910298/coverNull.png?ex=6617baf8&is=660545f8&hm=fdb5c8f6b26fb95b20298281d5f7e9989e74dd8f4e7cf92228dbf68f415d51eb&"></div>
				</div>
				<div class="col-md-8">
					<div class="row">
						<div class="col-md-2 my-1">
							<label for="id" class="form-label">Mã</label>
							<input type="number" class="form-control" id="id" name="id" placeholder="..." disabled>
						</div>
						<div class="col-md-10 my-1">
							<label for="title" class="form-label">Tiêu đề</label>
							<input type="text" class="form-control" id="title" name="title" value="Sách" placeholder="..." required>
						</div>
						<div class="col-md-4 my-1">
							<label for="volume" class="form-label">Tập</label>
							<input type="number" class="form-control" id="volume" name="volume" value="1" onchange="inputControl(this)" placeholder="..." required>
						</div>
						<div class="col-md-4 my-1">
							<label for="price" class="form-label">Đơn giá</label>
							<div class="input-group">
								<input type="number" class="form-control" id="price" name="price" value="100000" onchange="inputControl(this)" placeholder="..." required>
								<span class="input-group-text">đ</span>
							</div>
						</div>
						<div class="col-md-4 my-1">
							<label for="quantity" class="form-label">Số lượng</label>
							<input type="number" class="form-control" id="quantity" name="quantity" value="1" onchange="inputControl(this)" placeholder="..." required>
						</div>
						<div class="col-12 my-1 d-flex justify-content-around">
							<button class="btn btn-primary" type="submit" name="submit">Cập nhật</button>
							<button class="btn btn-danger" type="reset" name="reset">Hoàn tác</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</section>
	<section class="d-flex justify-content-center">
		<div class="displayBook bg-white mx-4 my-3 container rounded">
			<div class="header d-flex align-items-end gap-2 border-bottom border-2 py-1">
				<i class="bi bi-table icon"></i>
				<h3 class="m-0">Bảng hiển thị</h3>
			</div>
			<div class="mt-1 table-responsive">
				<table class="table table-striped">
					<thead>
						<tr class="text-center text-nowrap">
							<th>Mã</th>
							<th>Ảnh bìa</th>
							<th>Tiêu đề</th>
							<th>Tập</th>
							<th>Đơn giá</th>
							<th>Số lượng</th>
							<th>Công cụ</th>
						</tr>
					</thead>
					<tbody class="display">
						<?php displayBook($result) ?>
					</tbody>
				</table>
			</div>
		</div>
	</section>
	<?php include '../assets/php/footer.php'; ?>
</body>
</html>