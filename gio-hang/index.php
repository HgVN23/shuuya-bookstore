<?php include '../assets/php/crud.php'; ?>
<?php
	if(isset($_POST['payItem'])) {
		$id = $_POST['payItem'];
		$quantity = $_POST['quantity'];

		$query1 = "UPDATE `book` SET `quantity`= (quantity - '$quantity') WHERE id = '$id'";
		$book->execute($query1);
		$query2 = "DELETE FROM `cart` WHERE id = '$id'";
		$cart->execute($query2);

		$cart->stopSubmit();
	}

	if(isset($_POST['removeFromCart'])) {
		$id = $_POST['removeFromCart'];

		$query = "DELETE FROM `cart` WHERE id = '$id'";
		$cart->execute($query);

		$cart->stopSubmit();
	}

	if(isset($_POST['removeCart'])) {
		$query = "DELETE FROM `cart`";
		$cart->execute($query);

		$cart->stopSubmit();
	}

	if(isset($_POST['payCart'])) {
		$temp = $cart->display('cart');
		while($item = $temp->fetch_assoc()) {
			$tempId = $item["id"];
			$quantity = $item["quantity"];
			$query = "UPDATE `book` SET `quantity`= (quantity - '$quantity') WHERE id = '$tempId'";
			$book->execute($query);
		}
		$query = "DELETE FROM `cart`";
		$cart->execute($query);

		$cart->stopSubmit();
	}

	if(isset($_POST['update'])) {
		$id = $_POST['update'];
		$quantity = $_POST['quantity'];

		$query = "UPDATE `cart` SET `quantity`= '$quantity' WHERE id = '$id'";
		$cart->execute($query);

		$cart->stopSubmit();
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="../assets/img/logo.png">
	<meta name="theme-color" content="#000bff">

	<title>Shuuya's Bookstore | Giỏ hàng</title>
	<meta name="title" content="Shuuya's Bookstore">
	<meta name="description" content="Bài kiểm tra">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:site_name" content="Shuuya's Bookstore">
	<meta property="og:url" content="https://hgvn23.github.io/shuuya-bookstore/">
	<meta property="og:title" content="Shuuya's Bookstore | Giỏ hàng">
	<meta property="og:description" content="Bài kiểm tra">
	<meta property="og:image" content="https://raw.githubusercontent.com/HgVN23/shuuya-bookstore/main/assets/img/thumbnail.png">

	<!-- Bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

	<!-- CSS -->
	<link rel="stylesheet" href="../assets/main.css">

	<!-- JS -->
	<script type="text/javascript" src="../assets/js/newStorage.js" defer></script>
	<script type="text/javascript" src="../assets/js/newCart.js" defer></script>
</head>
<body>
	<?php include '../assets/php/header.php'; ?>
	<section class="d-flex justify-content-center">
		<div class="displayBook displayCart bg-white mx-4 my-3 container rounded">
			<div class="header d-flex align-items-end gap-2 border-bottom border-2 mb-2 py-1">
				<i class="bi bi-cart4 icon"></i>
				<h3 class="m-0">Giỏ hàng</h3>
			</div>
			<div class="cart p-3">
				<?php displayCart($book, $cart->display('cart')); ?>
			</div>
		</div>
	</section>
	<?php include '../assets/php/footer.php'; ?>
</body>
</html>