<?php
    include_once('./config.php');

    // $data = json_decode(file_get_contents('php://input'), true);
    // $_POST = $data;


    include_once('./classes/todo.class.php');

    $todo = new Todo($con);
    $tasks = $todo->getTasks();
    // $tasks = $tasks->();
    // $todo = json_decode($todo, true);
    // echo json_encode()

    echo json_encode(array(
            'status' => true,
            'tasks' => $tasks->fetch_all(MYSQLI_ASSOC)
        )
    )

?> 