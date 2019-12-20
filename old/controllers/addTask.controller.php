<?php
    include_once('./config.php');

    $data = json_decode(file_get_contents('php://input'), true);
    $_POST = $data;


    include_once('./classes/todo.class.php');

    $todo = new Todo($con);
    $todo = $todo->insertTask($_POST['task']);
    $todo = json_decode($todo, true);

    echo json_encode(array(
        'status' => $todo['query'],
        'id' => $todo['id']
        )
    )

?> 