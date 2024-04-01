<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$mydb = "bookstore";

	$conn = new mysqli($servername, $username, $password, $mydb);
	mysqli_set_charset($conn, 'utf8');

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT * FROM book";
	$result = $conn->query($sql);

	if(isset($_POST['submit'])) {
		$cover = $_POST['coverImg'];
		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];

		mysqli_query($conn, "INSERT INTO `book`(`cover`, `title`, `volume`, `price`, `quantity`) VALUES ('$cover', '$title', '$volume', '$price', '$quantity')");
	}
?>
<?php include 'showItem.php'; ?>