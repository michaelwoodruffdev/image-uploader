<?php

    // Check that file was actually uploaded
    if (!empty($_FILES["fileToUpload"]["name"])) {
        $filename = $_FILES["fileToUpload"]["name"];
    } else {
        error_log("No file uploaded...");
        return;
    }

    // Check that file is actually an image and is correct type
    $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
    if (strtolower($fileExtension) != "png" && strtolower($fileExtension) != "jpg") {
        error_log("File is not of correct type (jpg, png)");
        return;
    }
    
    // Create target filepath and move file from temp directory to stored directory
    $target_filepath = "uploads/" . $filename;
    $temp_filepath = $_FILES["fileToUpload"]["tmp_name"];
    if(!move_uploaded_file($temp_filepath, $target_filepath)) {
        error_log("File unable to upload");
        return;
    }

    // Initialize data to be stored into database
    $image_name = substr($filename, 0, strrpos($filename, '.'));
    $image_path = $target_filepath;
    $image_size = $_FILES["fileToUpload"]["size"];
    $image_type = $fileExtension;
    $image_upload_datetime = date("Y-m-d H:i:s");

    // Attempt to connect to database
    $conn = new mysqli("localhost", "mrwwf4", "80897894568mW!", "Challenge2");
    if ($conn->connect_error) {
        error_log("Couldn't connect to db");
        return;
    }

    // Create sql statement
    $sql = 
        "insert into images (filepath, filesize, filetype, uploadDatetime)
            values ('$image_path', $image_size, '$image_type', '$image_upload_datetime')";
            
    // Run sql statement
    if (!$conn->query($sql)) {
        error_log("Error executing sql statement");
        $conn->close();
        return;
    }

    $conn->close();
    return;

?>
