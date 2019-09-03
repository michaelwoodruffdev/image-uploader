<?php 

	if (!isset($_GET["filepath"])) {
		return;
	}

	$conn = new mysqli("localhost", "mrwwf4", "80897894568mW!", "Challenge2");

	$sql = "delete from images where filepath = '" . $_GET["filepath"] . "'";

	if (!$conn->query($sql)) {
		$conn->close();
		return;
	}

	unlink($_GET["filepath"]);

	$conn->close();
	return;

?>
