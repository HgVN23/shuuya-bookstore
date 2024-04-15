<?php
require_once 'db.php';
require_once 'showItem.php';

class Crud extends Database {
	function __construct() {
		parent::__construct();
	}

	function create($table) {
		if(isset($_FILES['cover']) && $_FILES['cover']['error'] == 0)
			$cover = file_get_contents($_FILES['cover']['tmp_name']);
		else
			$cover = file_get_contents('https://cdn.discordapp.com/attachments/677761423870525442/1222854468450910298/coverNull.png?ex=662a2ff8&is=6617baf8&hm=8f4daee9b077736301afeb4f726fd0dcc5bc5a2b00b1b6e61c5d3348b625d316&');

		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];
		
		$query = "INSERT INTO $table(cover, title, volume, price, quantity) VALUES (?, ?, ?, ?, ?)";
		$result = $this->pdo->prepare($query);
		$result->bindParam(1, $cover);
		$result->bindParam(2, $title);
		$result->bindParam(3, $volume);
		$result->bindParam(4, $price);
		$result->bindParam(5, $quantity);
		$result->execute();

		$this->stopSubmit();
	}

	function display($table) {
		$query = "SELECT * FROM $table ORDER BY `id` DESC";

		$result = $this->con->query($query);
	
		return $result;
	}

	function execute($query) {
		$result = $this->con->query($query);
	
		return $result;
	}

	function delete($table) {
		$id = $_POST['delete'];

		$query = "DELETE FROM $table WHERE id = '$id'";

		$result = $this->con->query($query);

		$maxId = maxId($this);
		$this->execute("ALTER TABLE `book` AUTO_INCREMENT = $maxId");

		$this->stopSubmit();
	}

	function edit($table) {
		$id = $_POST['id'];
		$title = $_POST['title'];
		$volume = $_POST['volume'];
		$price = $_POST['price'];
		$quantity = $_POST['quantity'];

		if(isset($_FILES['cover']) && $_FILES['cover']['error'] == 0) {
			$cover = file_get_contents($_FILES['cover']['tmp_name']);

			$query = "UPDATE $table SET `cover` = ? WHERE id = ?";
			$result = $this->pdo->prepare($query);
			$result->bindParam(1, $cover);
			$result->bindParam(2, $id);
			$result->execute();
		}

		$query = "UPDATE `book` SET `title`='$title',`volume`='$volume',`price`='$price',`quantity`='$quantity' WHERE id = '$id'";
		$this->execute($query);

		$this->stopSubmit();
	}

	function stopSubmit() {
		header("Location: ./");
	}
}

$book = new Crud();
$cart = new Crud();

function maxId($book) {
	$query = "SELECT max(`id`) AS `max` FROM `book`";
	$result = $book->execute($query);
	return (int)$result->fetch_assoc()["max"] + 1;
}

?>