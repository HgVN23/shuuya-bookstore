<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$mydb = "bookstore";

	$conn = new mysqli($servername, $username, $password, $mydb);
	mysqli_set_charset($conn, 'utf8');

	if($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$book = $conn->query("SELECT * FROM book");
	$cart = $conn->query("SELECT * FROM cart");
?>
<?php
	if(isset($_POST['submit'])) {
		$cover = $_POST['coverImg'];
		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];

		mysqli_query($conn, "INSERT INTO `book`(`cover`, `title`, `volume`, `price`, `quantity`) VALUES ('$cover', '$title', '$volume', '$price', '$quantity')");

		header("Location: ../kho-sach");
	}
?>
<?php
	if(isset($_POST['edit'])) {
		$id = $_POST['id'];
		$cover = $_POST['coverImg'];
		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];

		mysqli_query($conn, "UPDATE `book` SET `cover`='$cover',`title`='$title',`volume`='$volume',`price`='$price',`quantity`='$quantity' WHERE id = '$id'");

		header("Location: ../kho-sach");
	}
?>
<?php
	if(isset($_POST['delete'])) {
		$id = $_POST['delete'];

		mysqli_query($conn, "DELETE FROM `book` WHERE id = '$id'");

		$maxId = maxId($conn);
		mysqli_query($conn, "ALTER TABLE `book` AUTO_INCREMENT = $maxId");

		header("Location: ../kho-sach");
	}
?>
<?php
	if(isset($_POST['addToCart'])) {
		$id = $_POST['addToCart'];

		mysqli_query($conn, "INSERT INTO `cart`(`id`) VALUES ('$id')");

		header("Location: ./");
	}
	if(isset($_POST['removeFromCart'])) {
		$id = $_POST['removeFromCart'];

		mysqli_query($conn, "DELETE FROM `cart` WHERE id = '$id'");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['payCart'])) {
		$id = $_POST['payCart'];

		
	}
?>
<?php
	function maxId($conn) {
		$result = $conn->query("SELECT max(`id`) AS max FROM book");
		return (int)$result->fetch_assoc()["max"] + 1;
	}
?>
<?php include 'showItem.php'; ?>