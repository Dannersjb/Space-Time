<?php

class high_score
{
    public function get_high_scores()
    {
        require 'db_con/mysqli_connection.php';
        $sql = "DELETE FROM high_scores WHERE score_id NOT IN ( SELECT * FROM (SELECT score_id FROM high_scores ORDER BY score DESC LIMIT 10) s)";
        $query = mysqli_query($db_conx, $sql);

        $sql = ('SELECT * FROM high_scores ORDER BY score DESC');
        $query = mysqli_query($db_conx, $sql);
        $high_scores_list = '<table class="scores">';
        $pos = 0;

        while ($row = mysqli_fetch_array($query)) {
            $pos++;
            $id = $row["score_id"];
            $name = $row["name"];
            $score = $row["score"];
            $high_scores_list .= '<tr>' .'<td class="position">' . $pos . '. </td><td class="hs_name">' . $name . '</td><td class="hs_scores">' . number_format($score) . '</td></tr>';
        }
        $high_scores_list .= '</table>';
        echo $high_scores_list;
    }

    public function submit_score()
    {
            require 'db_con/mysqli_connection.php';
            $name = mysqli_real_escape_string($db_conx, $_POST['name']);
            $score = mysqli_real_escape_string($db_conx, $_POST['final_score']);
            $sql = mysqli_query($db_conx, "INSERT INTO high_scores(name, score)
            VALUES('$name','$score')") or die (mysqli_error($db_conx));
            header('location:index.php');
    }
}

$class = new high_score();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['name'])) {
        header('location:index.php');
    } else {
        $class->submit_score();
    }
}
