<?php
    include_once('./config.php');

    $data = json_decode(file_get_contents('php://input'), true);
    $_POST = $data;


    include_once('./classes/todo.class.php');

    $todo = new Todo($con);
    $todo = $todo->taskFinished($_POST['newState'], $_POST['idTask']);

    echo json_encode(
        $todo
    )

?> 