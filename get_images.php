<?php

	$conn = new mysqli("localhost", "mrwwf4", "80897894568mW!", "Challenge2");

	$sql = "select * from images";

	$result = $conn->query($sql);

	$return_object = array();

	while ($row = $result->fetch_assoc()) {
		//if ($row["filetype"] == "png") {
		//	$row["image"] = imagecreatefrompng($row["filepath"]);
		//}
		$return_object[] = $row;	
	}

	print json_encode($return_object);

	$conn->close();
?>
