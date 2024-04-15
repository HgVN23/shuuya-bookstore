<?php include 'crud.php'; ?>
<?php
	// get the ID of the image from the URL
	$id = $_GET['id'];

	// retrieve the image data from the database
	$query = "SELECT `cover` FROM book WHERE id = ?";
	$displayImg = $book->pdo->prepare($query);
	$displayImg->bindParam(1, $id);
	$displayImg->execute();

	// output the image data
	$row = $displayImg->fetch(PDO::FETCH_ASSOC);
	echo $row['cover'];
?>