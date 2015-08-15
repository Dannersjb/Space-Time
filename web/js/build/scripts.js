var bgm = new Image();
bgm.src = "images/mountains.png";
var bgml = new Image();
bgml.src = "images/mountains_lower.png";
var bgp = new Image();
bgp.src = "images/space_planets.png";
var sbg = new Image();
sbg.src = "images/background.jpg";
/*var ss = new Image();
ss.src = "images/spaceship.png";*/
var ess = new Image();
ess.src = "images/enemy_spaceship.png";
var boss = new Image();
boss.src = "images/carrier.png";
var missile = new Image();
missile.src = "images/missile.png";
var emissile = new Image();
emissile.src = "images/enemy_missile.png";
var exp = new Image();
exp.src = "images/explosion.png";



var ss = new Image();
ss.src = "images/ss.png";
var ssl = new Image();
ssl.src = "images/ss-left.png";
var ssr = new Image();
ssr.src = "images/ss-right.png";
var ssu = new Image();
ssu.src = "images/ss-up.png";

var sss = new Image();
sss.src = "images/spaceshipsprites.gif";


var cw = new Image();
cw.src = "images/Clancy_Wiggum.png";

var explosion = new Audio('audio/explosion.wav');
var speedboost = new Audio('audio/ay ay.mp3');
var fireB = new Audio('audio/fire.wav');

var score = 0;
var level = 0;
var count = 0;
var damage = 100;
var enemy_hp = 10
var enemy_points = 10;
var attack_speed = 1000;
var player_speed = 5;
var charge = 100;
var player_fire_speed = 100;
var power_up_time = 0;

var Key = {
    _pressed: {},

    LEFT: 65,
    UP: 87,
    RIGHT: 68,
    DOWN: 83,
    FIRE: 70,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

//random health drop
// if player contacts speed boost player_fire_speed == 10
//sprite sheet for movement

function initCanvas() {
    var ctx = document.getElementById('game_window').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;

    var main_music = new Audio('audio/game.wav');
    main_music.addEventListener('timeupdate', function(){
        var buffer = .44;
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0
            this.play()
        }}, false);

    var enemies = [
        { "x" : 170, "y" : 50, "w" : 60, "h" : 20, "hp" : enemy_hp },
        { "x" : 350, "y" : 50, "w" : 60, "h" : 20, "hp" : enemy_hp },
        { "x" : 550, "y" : 50, "w" : 60, "h" : 20, "hp" : enemy_hp },
        { "x" : 70, "y" : 170, "w" : 60, "h" : 20, "hp" : enemy_hp },
        { "x" : 250, "y" : 170, "w" : 60, "h" : 20, "hp" : enemy_hp },
        { "x" : 450, "y" : 170, "w" : 60, "h" : 20, "hp" : enemy_hp },
        { "x" : 650, "y" : 170, "w" : 60, "h" : 20, "hp" : enemy_hp }
    ];

    var attack = [];
    var power_up = [];

    function enemyDetect (a, as) {
            var e = player;
            if (a.x+a.w >= e.x && a.x <= e.x+e.w && a.y >= e.y && a.y <= e.y+ e.h) {
                attack.splice(as,1);
                explosion.play();
                document.getElementById('status').innerHTML = "ahhhhhhhhhhhhhhhh!";
                damage -= 10;
                if (damage <= 0) {
                    damage = 0;
                    document.getElementById('health_value').innerHTML = "0 / 100";
                } else {
                    document.getElementById('score').innerHTML = "Score : " + score;
                    document.getElementById('health_value').innerHTML = damage + " / 100";
                }
            }

    }
    function pickUp( p, ps) {
        var e = player;
        if (p.x+p.w >= e.x && p.x <= e.x+e.w && p.y >= e.y && p.y <= e.y+ e.h) {
            power_up.splice(ps,1);
            //document.getElementById('speedboost').play()
            speedboost.play();
            player_fire_speed = 10;
            power_up_time = 0;
        }
    }

    function renderEnemies() {
        for (var i = 0; i < attack.length; i++) {
            var a = attack[i];
            ctx.drawImage(emissile, a.x, a.y += 5);
            enemyDetect(attack[i], i);
            if (a.y >= 550) {
                attack.splice(i, 1);
            }
        }
        for (var i = 0; i < power_up.length; i++) {
            var p = power_up[i];
            ctx.drawImage(cw, p.x, p.y);
            pickUp(power_up[i], i);
        }
        for (i = 0; i < enemies.length; i++) {
            if (level == 1) {
                ctx.drawImage(boss, enemies[i].x, enemies[i].y++);
            } else {
                ctx.drawImage(ess, enemies[i].x, enemies[i].y++);
            }
            if (enemies[i].y > 270) {
                enemies[i].y = 50;
            }
            count++;
        }
        if (count >= attack_speed) {
            var rand = Math.floor((Math.random() * enemies.length));
            attack.push({"x": enemies[rand].x + 30, "y": enemies[rand].y, "w": 3, "h": 10})
            power_up.push({"x":400, "y": 500, "w":20, "h":20})
            rand = 0;
            count = 0;
        }
        if (power_up_time >= 30) {
            player_fire_speed = 100;
            power_up_time = 0;
        }
    }
    function renderHealth() {
            if (damage <= 0) {
                damage = 0;
                clearInterval(animateInterval);
                var game_over = new Audio('audio/game_over.wav')
                game_over.play();
                document.getElementById('status').innerHTML = "Game Over";
                document.getElementById('score').innerHTML = 'Score : ' + score;
                document.getElementById('controls').innerHTML = 'Press f5 to start again';
                document.getElementById('info').innerHTML ="What's that chief?";
                document.getElementById('final_score').value = score;
                document.getElementById("game_over").className = 'form';
                document.getElementById('final_points').innerHTML = "You Scored : " + score;
                document.getElementById("name").focus();
            }
            ctx.strokeStyle="grey";
            ctx.rect(160, 13, 200, 30);
            ctx.stroke();
            ctx.fillStyle="red";
            ctx.fillRect(160, 13, 200, 30);
            ctx.fillStyle="#42F103";
            ctx.fillRect(160, 13, damage*2, 30);

            ctx.strokeStyle="grey";
            ctx.rect(510, 13, 100, 30);
            ctx.stroke();
            ctx.fillStyle="red";
            ctx.fillRect(510, 13, 100, 30);
            ctx.fillStyle="blue";
            ctx.fillRect(510, 13, charge, 30);

        if (player_fire_speed == 10) {
            ctx.fillStyle="yellow";
            ctx.fillRect(510, 13, 100, 30);
        }

    }
    function Background() {
        this.x = 0, this.y = 0, this.w = sbg.width, this.h = sbg.height;
        this.render = function() {
            ctx.drawImage(sbg, this.x-=0.2, 0);
            if (this.x <= -1492) {
                this.x = 0;
            }
        }
    }
    function BackgroundPlanets() {
        this.x = 0, this.y = 0, this.w = bgp.width, this.h = bgp.height;
        this.render = function() {
            ctx.drawImage(bgp, this.x-=0.5, 0);
            if (this.x <= -1900) {
                this.x = 0;
            }
        }
    }
    function BackgroundMount() {
        this.x = 0, this.y = 0, this.w = bgm.width, this.h = bgm.height;
        this.render = function() {
           ctx.drawImage(bgm, this.x-=2, 0);
            if (this.x <= -1680) {
                this.x = 0;
            }
        }
    }
    function BackgroundMountLower() {
        this.x = 0, this.y = 0, this.w = bgml.width, this.h = bgml.height;
        this.render = function() {
            ctx.drawImage(bgml, this.x-=3.5, 0);
            if (this.x <= -1680) {
                this.x = 0;
            }
        }
    }
   function Player() {
       this.x = 350, this.y = 450, this.w = ss.width, this.h = ss.height, this.fire, this.missiles = [];
       this.render = function () {
           if (Key.isDown(Key.UP)) {
               this.y -= player_speed;
               ctx.drawImage(sss, 35, 86, 45, 39, this.x, this.y, 80, 80 );
           }
           else if (Key.isDown(Key.LEFT)) {
               this.x -= player_speed;
               ctx.drawImage(sss, -10, 0, 45, 39, this.x, this.y, 80, 80 );
           }
           else if (Key.isDown(Key.DOWN)) {
               this.y += player_speed;
               ctx.drawImage(sss, 35, 0, 45, 39, this.x, this.y, 80, 80 );
           }
           else if (Key.isDown(Key.RIGHT)) {
               this.x += player_speed;
               ctx.drawImage(sss, 78, 0, 45, 39, this.x, this.y, 80, 80 );
           }
           else {
               ctx.drawImage(sss, 35, 0, 45, 39, this.x, this.y, 80, 80 );
           }

           charge++;
           if (charge >= player_fire_speed) {
               charge = player_fire_speed;
           }
           if (Key.isDown(Key.FIRE) && charge >= player_fire_speed) {
               var fire = new Audio('audio/fire.wav')
               //fireB.play();

               document.getElementById('speedboost').play()
               this.missiles.push({"x": this.x + this.w * .5, "y": this.y, "w": 3, "h": 10})
               charge = 0;
               power_up_time++;
           }
           for (var i = 0; i < this.missiles.length; i++) {
               var m = this.missiles[i];
               ctx.drawImage(missile, m.x, m.y -= 5);
               this.hitDetect(player.missiles[i], i);
               if (m.y <= 10) {
                   this.missiles.splice(i, 1);
               }
           }
               if (this.y < 400) {
                   damage = damage - 1;
                   document.getElementById('health_value').innerHTML = damage + " / 100";
                   this.y = 400;
               }
               if (this.y > 530) {
                   damage = damage - 1;
                   document.getElementById('health_value').innerHTML = damage + " / 100";
                   this.y = 530;
               }
           
           if (enemies.length == 0) {
               enemy_hp =  enemy_hp * 1.2;
               level++;
               enemy_points = enemy_points * 2;
               attack_speed = attack_speed / 1.2;
               if (level == 1) {
                   enemies.push({"x": 250, "y": 20, "w": 295, "h": 140, "hp": enemy_hp * 5});
               } else if (level == 4) {
                   level = 0;
               }
               else {
                   enemies.push (
                       {"x": 170, "y": 50, "w": 60, "h": 20, "hp": enemy_hp},
                       {"x": 350, "y": 50, "w": 60, "h": 20, "hp": enemy_hp},
                       {"x": 550, "y": 50, "w": 60, "h": 20, "hp": enemy_hp},
                       {"x": 70, "y": 170, "w": 60, "h": 20, "hp": enemy_hp},
                       {"x": 250, "y": 170, "w": 60, "h": 20, "hp": enemy_hp},
                       {"x": 450, "y": 170, "w": 60, "h": 20, "hp": enemy_hp},
                       {"x": 650, "y": 170, "w": 60, "h": 20, "hp": enemy_hp}
                   );
               }
           }
       }

       this.hitDetect = function(m,mi) {
           for(var i = 0; i < enemies.length; i++) {
               var e = enemies [i];
               if (m.x+m.w >= e.x && m.x <= e.x+e.w && m.y >= e.y && m.y <= e.y+ e.h) {
                   this.missiles.splice(mi,1);
                   enemies[i].hp -= 20;
                   ctx.drawImage(exp, e.x, e.y);
                   explosion.play();
                   if (enemies[i].hp <= 0) {
                       score = score += enemy_points;
                       enemies.splice(i, 1);
                       document.getElementById('status').innerHTML = "You destroyed an enemy";
                       document.getElementById('score').innerHTML = "Score : " + score;
                   }
               }
           }
       }
   }



    var background = new Background();
    var player = new Player();
    var backgroundPlanets = new BackgroundPlanets();
    var backgroundMount = new BackgroundMount();
    var backgroundLower = new BackgroundMountLower();


    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        // start
        background.render();
        backgroundPlanets.render();
        backgroundMount.render();
        backgroundLower.render();
        player.render();
        renderEnemies();
        renderHealth();
        // end
        ctx.restore();
    }
    var animateInterval = setInterval(animate, 20);


    document.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    document.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
}

window.addEventListener('load', function(event) {
    initCanvas();
});