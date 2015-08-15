<?php
    require 'high_score.php';
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Space Time</title>
    <link rel="icon" href="favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="css/header.css">
    <script src="js/build/scripts.js"></script>
</head>
<body>
<h1 id="status">Welcome to Space Time</h1>

<p id="info">This is a short game made for the purpose of expanding javascript knowledge</p>
<span id="controls">use the "wasd" controls to move around the canvas, and "f" key to fire</span>
<span id="end"></span>

<div id="page">
    <span id="score">Score : 0</span>
    <span id="health_text">Ship's HP : </span><span id="health_value">100 / 100</span>
    <span id="missile_charge">Charge : </span>

    <audio autoplay loop="loop">
        <source src="audio/game.wav" type="audio/wav">
    </audio>
    <audio id="explosion">
        <source src="audio/explosion.wav" type="audio/wav">
    </audio>
    <audio id="speedboost">
        <source src="audio/AYYYYYY.mp3" type="audio/mp3">
    </audio>


    <div id="game_over" class="form hidden">
        <form action="high_score.php" method="post">
            <span id="final_points">You Scored :  </span>
            <input type="hidden" id="final_score" name="final_score">
            <label>Please Enter your name : <input type="text" id="name" name="name" autocomplete="off"></label>
            <input type="submit" class="submit_score" name="submit" value="Submit Score >">
        </form>
    </div>

    <canvas id="game_window" width="800" height="600"></canvas>

    <div class="high_scores">
        <h1>High Scores</h1>
        <?php $class->get_high_scores(); ?>
    </div>




</div>
</body>
</html>