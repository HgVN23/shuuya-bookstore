<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$mydb = "bookstore";

	$conn = new mysqli($servername, $username, $password, $mydb);
	mysqli_set_charset($conn, 'utf8');

	$dsn = 'mysql:dbname='.$mydb.';host='.$servername;
	$pdo = new PDO($dsn, $username, $password);

	if($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$book = $conn->query("SELECT * FROM book");
	$cart = $conn->query("SELECT * FROM cart");
?>
<?php
	if(isset($_POST['submit'])) {
		if(isset($_FILES['cover']) && $_FILES['cover']['error'] == 0)
			$cover = file_get_contents($_FILES['cover']['tmp_name']);
		else
			$cover = file_get_contents('https://cdn.discordapp.com/attachments/677761423870525442/1222854468450910298/coverNull.png?ex=662a2ff8&is=6617baf8&hm=8f4daee9b077736301afeb4f726fd0dcc5bc5a2b00b1b6e61c5d3348b625d316&');

		$stmt = $pdo->prepare("INSERT INTO book (cover) VALUES (?)");
		$stmt->bindParam(1, $cover);
		$stmt->execute();

		$id = $_POST['id'];
		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];

		mysqli_query($conn, "UPDATE `book` SET `title`='$title',`volume`='$volume',`price`='$price',`quantity`='$quantity' WHERE id = '$id'");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['edit'])) {
		$id = $_POST['id'];
		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];

		if(isset($_FILES['cover']) && $_FILES['cover']['error'] == 0) {
			$cover = file_get_contents($_FILES['cover']['tmp_name']);

			$stmt = $pdo->prepare("UPDATE `book` SET `cover` = ? WHERE id = ?");
			$stmt->bindParam(1, $cover);
			$stmt->bindParam(2, $id);
			$stmt->execute();
		}

		mysqli_query($conn, "UPDATE `book` SET `title`='$title',`volume`='$volume',`price`='$price',`quantity`='$quantity' WHERE id = '$id'");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['delete'])) {
		$id = $_POST['delete'];

		mysqli_query($conn, "DELETE FROM `book` WHERE id = '$id'");
		mysqli_query($conn, "DELETE FROM `cart` WHERE id = '$id'");

		$maxId = maxId($conn);
		mysqli_query($conn, "ALTER TABLE `book` AUTO_INCREMENT = $maxId");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['addToCart'])) {
		$id = $_POST['addToCart'];

		mysqli_query($conn, "INSERT INTO `cart`(`id`, `quantity`) VALUES ('$id', '1')");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['removeFromCart'])) {
		$id = $_POST['removeFromCart'];

		mysqli_query($conn, "DELETE FROM `cart` WHERE id = '$id'");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['payItem'])) {
		$id = $_POST['payItem'];
		$quantity = $_POST['quantity'];

		mysqli_query($conn, "UPDATE `book` SET `quantity`= (quantity - '$quantity') WHERE id = '$id'");
		mysqli_query($conn, "DELETE FROM `cart` WHERE id = '$id'");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['removeCart'])) {
		$id = $_POST['removeCart'];

		mysqli_query($conn, "DELETE FROM `cart`");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['payCart'])) {
		$id = $_POST['payCart'];

		if($cart->num_rows > 0) {
			while($item = $cart->fetch_assoc()) {
				$tempId = $item["id"];
				$quantity = $item["quantity"];
				mysqli_query($conn, "UPDATE `book` SET `quantity`= (quantity - '$quantity') WHERE id = '$tempId'");
			}
		}
		mysqli_query($conn, "DELETE FROM `cart`");

		header("Location: ./");
	}
?>
<?php
	if(isset($_POST['update'])) {
		$id = $_POST['update'];
		$quantity = $_POST['quantity'];

		mysqli_query($conn, "UPDATE `cart` SET `quantity`= '$quantity' WHERE id = '$id'");

		header("Location: ./");
	}
?>
<?php
	function maxId($conn) {
		$result = $conn->query("SELECT max(`id`) AS max FROM book");
		return (int)$result->fetch_assoc()["max"] + 1;
	}
?>
<?php include 'showItem.php'; ?>