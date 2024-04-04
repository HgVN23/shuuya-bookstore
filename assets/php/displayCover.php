<?php include 'db.php'; ?>
<?php
	// get the ID of the image from the URL
	$id = $_GET['id'];

	// retrieve the image data from the database
	$displayImg = $pdo->prepare("SELECT `cover` FROM book WHERE id = ?");
	$displayImg->bindParam(1, $id);
	$displayImg->execute();

	// output the image data
	$row = $displayImg->fetch(PDO::FETCH_ASSOC);
	echo $row['cover'];
?>