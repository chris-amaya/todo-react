<?php

    class Todo
    {
        private $con;

        public function __construct($con)
        {
            $this->con = $con;
        }

        public function getTasks()
        {
            $query = mysqli_query($this->con, "SELECT * FROM todos");
            return $this->validateQuery($query);
        }

        public function insertTask($task) {
            $query = mysqli_query($this->con, "INSERT INTO todos VALUES (null, '$task', 0)");
            $id = mysqli_insert_id($this->con);
            return json_encode(array(
                'query' => $query,
                'id' => $id
                )
            );
        }

        public function deleteTask($id) {
            $query = mysqli_query($this->con, "DELETE FROM todos WHERE idTodo = '$id'");
            // return $this->validateQuery($query);
            return $query;
        }

        public function updateTask($task, $id) {
            $query = mysqli_query($this->con, "UPDATE todos SET task = '$task' WHERE idTodo = '$id'");
            return $query;
        }

        public function taskFinished($newState, $id) {
            $query = mysqli_query($this->con, "UPDATE todos SET done = '$newState' WHERE idTodo = '$id'");
            return $query;

        }

        
        private function validateQuery($query)
        {
            if(gettype($query) == 'boolean') {
                if(mysqli_affected_rows($query) > 0) {
                    return $query;
                } else {
                    return false;
                }
            } else {
                if(mysqli_num_rows($query) > 0)
                {
                    return $query;
                } else {
                    return false;
                }
            }
        }



    }



?>
