document.getElementById('startBtn').addEventListener("click", function(){
    let fieldSize = 10;
    let wallDensity = 4;
    let field = document.getElementById('field');
    let path = "<img src='images/floor.png' alt='tile'/>";
    let wall = "<img src='images/wall.png' alt='tile'/>";
    let heroDown = "<img src='images/hero-down.png' alt='hero-down'/>"
    let heroLeft = "<img src='images/hero-left.png' alt='hero-left'/>"
    let heroRight = "<img src='images/hero-right.png' alt='hero-right'/>"
    let heroUp = "<img src='images/hero-up.png' alt='hero-up'/>"
    let skeleton1 = "<img src='images/skeleton.png' alt='skeleton'/>"
    let skeleton2 = "<img src='images/skeleton.png' alt='skeleton'/>"
    let skeleton3 = "<img src='images/skeleton.png' alt='skeleton'/>"
    let skeleton4 = "<img src='images/skeleton.png' alt='skeleton'/>"
    let skeleton5 = "<img src='images/skeleton.png' alt='skeleton'/>"
    let boss = "<img src='images/boss.png' alt='boss'/>"
    let clash = "<img src='images/clash.png' alt='clash'/>"
    let matrix = [];
    let statsField = document.getElementById('statsField');
    let heroLoc1;
    let heroLoc2;
    let isClash = false;
    let against;
    let enemyStats;
    

    statsField.style.display = "inline-block";
    let startBtn = document.getElementById('startBtn');
    startBtn.innerHTML = "RESET";
    startBtn.style.background = "#b37a4b";

    for (let k = 0; k < fieldSize; k++) {           //creating empty matrix
        matrix.push([]);
    }
                            
    field.innerHTML = '';       //clearing former game
    
    for (let i = 0; i < fieldSize; i++) {           //fill the matrix
        for (let j = 0; j < fieldSize; j++) {
            let randomNr = Math.floor(Math.random() * 10);
            if (randomNr <= wallDensity) {
                matrix[i].push(1);                  //wall
            } else {
                matrix[i].push(0);                  //path
            }
        }
    }
    matrix[0][0] = 0;                             //set 0^th tile as a path

    for (let m = 1; m < fieldSize-1; m++) {                                                     //iterate the ready matrix
        for (let n = 1; n < fieldSize-1; n++) {
            if (matrix[m][n] == 0 &&
                ( matrix[m-1][n] + matrix[m][n-1] + matrix[m][n+1] + matrix[m+1][n] ) > 2 ) {
                    matrix[m][n+1] = 0;                                                            //replace blockage
                    matrix[m+1][n] = 0;                                                            //replace blockage
                    matrix[m][n-1] = 0;
            }
        }
    }

    for (let r = 0; r < fieldSize; r += fieldSize-1) {                                        //first and last line check
        for (let s = 1; s < fieldSize-1; s++){
            if (r == 0 && 
                matrix[r][s] == 0 &&
                (matrix[r][s-1] + matrix[r][s+1] + matrix[r+1][s] > 1) ) {
                    matrix[r+1][s] = 0;
                    matrix[r][s+1] = 0;
            } else if (r == fieldSize-1 && 
                        matrix[r][s] == 0 &&
                        (matrix[r][s-1] + matrix[r][s+1] + matrix[r-1][s] > 1) ) {
                            matrix[r-1][s] = 0;
                            matrix[r][s+1] = 0;
            }
        }
    }

    for (let t = 0; t < fieldSize; t += fieldSize-1) {                                        //first and last col check
        for (let u = 1; u < fieldSize-1; u++){
            if (t == 0 && 
                matrix[u][t] == 0 &&
                (matrix[u-1][t] + matrix[u+1][t] + matrix[u][t+1] > 1) ) {
                    matrix[u+1][t] = 0;
                    matrix[u][t+1] = 0;
                    matrix[u-1][t] = 0;
            } else if (t == fieldSize-1 && 
                        matrix[u][t] == 0 &&
                        (matrix[u][t-1] + matrix[u+1][t] + matrix[u-1][t] > 1) ) {
                            matrix[u-1][t] = 0;
                            matrix[u][t+1] = 0;
                            matrix[u+1][t] = 0;
            }
        }
    }
    if (matrix[fieldSize-1][0] == 0) {       //bottom-left corner fixing
        matrix[fieldSize-1][1] = 0;
        matrix[fieldSize-2][0] = 0;
        matrix[fieldSize-2][2] = 0;
        matrix[fieldSize-2][3] = 0;
        matrix[fieldSize-3][3] = 0;
    } 

    if (matrix[fieldSize-1][fieldSize-1] == 0) {       //bottom-right corner
        matrix[fieldSize-1][fieldSize-2] = 0;
        matrix[fieldSize-2][fieldSize-1] = 0;
        matrix[fieldSize-3][fieldSize-1] = 0;
        matrix[fieldSize-4][fieldSize-1] = 0;
        matrix[fieldSize-3][fieldSize-2] = 0;
    } 

    if (matrix[0][fieldSize-1] == 0) {       //top-right corner
        matrix[0][fieldSize-2] = 0;
        matrix[1][fieldSize-1] = 0;
        matrix[2][fieldSize-1] = 0;
        matrix[2][fieldSize-2] = 0;
        matrix[2][fieldSize-3] = 0;
    } 

    matrix[0][1] = 0;                       //top-left corner
    matrix[1][1] = 0;
    matrix[2][1] = 0;                       
    matrix[3][1] = 0;
    matrix[2][2] = 0;

    matrix[0][0] = 'heroDown';

    function characterPlacer(character){
        let randomX = Math.floor(Math.random() * (fieldSize - 2)) + 1;
        let randomY = Math.floor(Math.random() * (fieldSize - 2)) + 1;
        if (matrix[randomX][randomY] == 0 &&
            (matrix[randomX - 1][randomY] == 0 || matrix[randomX - 1][randomY] == 1 ) &&
            (matrix[randomX + 1][randomY] == 0 || matrix[randomX + 1][randomY] == 1 ) &&
            (matrix[randomX][randomY - 1] == 0 || matrix[randomX][randomY - 1] == 1 ) &&
            (matrix[randomX][randomY + 1] == 0 || matrix[randomX][randomY + 1] == 1 )
            ) {
            matrix[randomX][randomY] = character;
        } else {
            characterPlacer(character);
        }
    };

    characterPlacer('skeleton1');
    characterPlacer('skeleton2');
    characterPlacer('skeleton3');
    characterPlacer('boss');

    function drawingField() {                                                                       //drawing field
        for (let p = 0; p < fieldSize; p++){
            for (let q = 0; q < fieldSize; q++){
                if (matrix[p][q] == 0){
                    document.getElementById('field').innerHTML += path;
                } else if (matrix[p][q] == 'heroDown') {
                    document.getElementById('field').innerHTML += heroDown;
                } else if (matrix[p][q] == 'heroRight') {
                    document.getElementById('field').innerHTML += heroRight;
                } else if (matrix[p][q] == 'heroLeft') {
                    document.getElementById('field').innerHTML += heroLeft;
                } else if (matrix[p][q] == 'heroUp') {
                    document.getElementById('field').innerHTML += heroUp;
                } else if (matrix[p][q] == 'skeleton1') {
                    document.getElementById('field').innerHTML += skeleton1;
                } else if (matrix[p][q] == 'skeleton2') {
                    document.getElementById('field').innerHTML += skeleton2;
                } else if (matrix[p][q] == 'skeleton3') {
                    document.getElementById('field').innerHTML += skeleton3;
                } else if (matrix[p][q] == 'skeleton4') {
                    document.getElementById('field').innerHTML += skeleton4;
                } else if (matrix[p][q] == 'skeleton5') {
                    document.getElementById('field').innerHTML += skeleton5;
                } else if (matrix[p][q] == 'boss') {
                    document.getElementById('field').innerHTML += boss;
                } else if (matrix[p][q] == 'clash') {
                    document.getElementById('field').innerHTML += clash;
                } else {
                    document.getElementById('field').innerHTML += wall;
                }
            }
            document.getElementById('field').innerHTML += '<br/>';
        }
    }
    drawingField();

    function findHero(){
        for (let a = 0; a < fieldSize; a++){                //finding hero location
            if (matrix[a].includes('heroDown')) {
                heroLoc1 = a;
                heroLoc2 = (matrix[a].indexOf('heroDown'));
                break;
            }
            if (matrix[a].includes('heroRight')) {
                heroLoc1 = a;
                heroLoc2 = (matrix[a].indexOf('heroRight'));
                break;
            }
            if (matrix[a].includes('heroLeft')) {
                heroLoc1 = a;
                heroLoc2 = (matrix[a].indexOf('heroLeft'));
                break;
            }
            if (matrix[a].includes('heroUp')) {
                heroLoc1 = a;
                heroLoc2 = (matrix[a].indexOf('heroUp'));
                break;
            }
            if (matrix[a].includes('clash')) {
                heroLoc1 = a;
                heroLoc2 = (matrix[a].indexOf('clash'));
                isClash = true;
                break;
            }
        }
    }

    function statON() {
        enemyStats = document.getElementById(against);
        enemyStats.style.display = 'inline';
    }
    function statOFF(){
        enemyStats = document.getElementById(against);
        enemyStats.style.display = 'none';
    }

    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                findHero();
                field.innerHTML = '';
                if(heroLoc1 >= 1 && isClash == false) {
                    if(matrix[heroLoc1 - 1][heroLoc2] == 0){
                        matrix[heroLoc1][heroLoc2] = 0;
                        matrix[heroLoc1 - 1][heroLoc2] = 'heroUp';
                        drawingField();
                    } else if (matrix[heroLoc1 - 1][heroLoc2] == 'boss' ||
                               matrix[heroLoc1 - 1][heroLoc2] == 'skeleton1' ||
                               matrix[heroLoc1 - 1][heroLoc2] == 'skeleton2' ||
                               matrix[heroLoc1 - 1][heroLoc2] == 'skeleton3' ||
                               matrix[heroLoc1 - 1][heroLoc2] == 'skeleton4' ||
                               matrix[heroLoc1 - 1][heroLoc2] == 'skeleton5'
                                ) {
                                    matrix[heroLoc1][heroLoc2] = 0;
                                    against = matrix[heroLoc1 - 1][heroLoc2];
                                    matrix[heroLoc1 - 1][heroLoc2] = 'clash';
                                    isClash = true;
                                    statON();
                                    drawingField();
                    } else {
                        matrix[heroLoc1][heroLoc2] = 'heroUp';
                        drawingField();
                    }
                } else if (heroLoc1 < 1 && isClash == false) {
                    matrix[heroLoc1][heroLoc2] = 'heroUp';
                    drawingField();
                }

                if(heroLoc1 >= 1 && isClash == true) {
                    if(matrix[heroLoc1 - 1][heroLoc2] == 0){
                        matrix[heroLoc1][heroLoc2] = against;
                        matrix[heroLoc1 - 1][heroLoc2] = 'heroUp';
                        isClash = false;
                        statOFF();
                        drawingField();
                    } else if (matrix[heroLoc1 - 1][heroLoc2] == 1 && isClash == true) {
                        matrix[heroLoc1][heroLoc2] = 'clash';
                        drawingField();
                    }
                } else if (isClash == true) {
                    matrix[heroLoc1][heroLoc2] = 'clash';
                    drawingField();
                }
                break;
            case 'ArrowDown':
                findHero();
                field.innerHTML = '';
                if(heroLoc1 <= fieldSize-2 && isClash == false) {
                    if(matrix[heroLoc1 + 1][heroLoc2] == 0){
                        matrix[heroLoc1][heroLoc2] = 0;
                        matrix[heroLoc1 + 1][heroLoc2] = 'heroDown';
                        drawingField();
                    } else if (matrix[heroLoc1 + 1][heroLoc2] == 'boss' ||
                                matrix[heroLoc1 + 1][heroLoc2] == 'skeleton1' ||
                                matrix[heroLoc1 + 1][heroLoc2] == 'skeleton2' ||
                                matrix[heroLoc1 + 1][heroLoc2] == 'skeleton3' ||
                                matrix[heroLoc1 + 1][heroLoc2] == 'skeleton4' ||
                                matrix[heroLoc1 + 1][heroLoc2] == 'skeleton5'
                                ) {
                                    matrix[heroLoc1][heroLoc2] = 0;
                                    against = matrix[heroLoc1 + 1][heroLoc2];
                                    matrix[heroLoc1 + 1][heroLoc2] = 'clash';
                                    isClash = true;
                                    statON();
                                    drawingField();
                    } else {
                        matrix[heroLoc1][heroLoc2] = 'heroDown';
                        drawingField();
                    }
                } else if (heroLoc1 > fieldSize-2 && isClash == false) {
                    matrix[heroLoc1][heroLoc2] = 'heroDown';
                    drawingField();
                }

                if(heroLoc1 <= fieldSize-2 && isClash == true) {
                    if(matrix[heroLoc1 + 1][heroLoc2] == 0){
                        matrix[heroLoc1][heroLoc2] = against;
                        matrix[heroLoc1 + 1][heroLoc2] = 'heroDown';
                        isClash = false;
                        statOFF();
                        drawingField();
                    } else if (matrix[heroLoc1 + 1][heroLoc2] == 1 && isClash == true) {
                        matrix[heroLoc1][heroLoc2] = 'clash';
                        drawingField();
                    }
                } else if (isClash == true) {
                    matrix[heroLoc1][heroLoc2] = 'clash';
                    drawingField();
                }
                break;



            case 'ArrowLeft':
                findHero();
                field.innerHTML = '';
                if(heroLoc2 >= 1 && isClash == false) {
                    if(matrix[heroLoc1][heroLoc2 - 1] == 0){
                        matrix[heroLoc1][heroLoc2] = 0;
                        matrix[heroLoc1][heroLoc2 - 1] = 'heroLeft';
                        drawingField();
                    } else if (matrix[heroLoc1][heroLoc2 - 1] == 'boss' ||
                                matrix[heroLoc1][heroLoc2 - 1] == 'skeleton1' ||
                                matrix[heroLoc1][heroLoc2 - 1] == 'skeleton2' ||
                                matrix[heroLoc1][heroLoc2 - 1] == 'skeleton3' ||
                                matrix[heroLoc1][heroLoc2 - 1] == 'skeleton4' ||
                                matrix[heroLoc1][heroLoc2 - 1] == 'skeleton5'
                                ) {
                                    matrix[heroLoc1][heroLoc2] = 0;
                                    against = matrix[heroLoc1][heroLoc2 - 1];
                                    matrix[heroLoc1][heroLoc2 - 1] = 'clash';
                                    isClash = true;
                                    statON();
                                    drawingField();
                    } else {
                        matrix[heroLoc1][heroLoc2] = 'heroLeft';
                        drawingField();
                    }
                } else if (heroLoc2 < 1 && isClash == false) {
                    matrix[heroLoc1][heroLoc2] = 'heroLeft';
                    drawingField();
                }
                
                if(heroLoc2 >= 1 && isClash == true) {
                    if(matrix[heroLoc1][heroLoc2 - 1] == 0){
                        matrix[heroLoc1][heroLoc2] = against;
                        matrix[heroLoc1][heroLoc2 - 1] = 'heroLeft';
                        isClash = false;
                        statOFF();
                        drawingField();
                    } else if (matrix[heroLoc1][heroLoc2 - 1] == 1 && isClash == true) {
                        matrix[heroLoc1][heroLoc2] = 'clash';
                        drawingField();
                    }
                } else if (isClash == true) {
                    matrix[heroLoc1][heroLoc2] = 'clash';
                    drawingField();
                }
                break;


            case 'ArrowRight':                                    
                findHero();
                field.innerHTML = '';
                if(heroLoc2 <= fieldSize - 2 && isClash == false) {
                    if(matrix[heroLoc1][heroLoc2 + 1] == 0 && isClash == false){
                        matrix[heroLoc1][heroLoc2] = 0;
                        matrix[heroLoc1][heroLoc2 + 1] = 'heroRight';
                        drawingField();
                    } else if (matrix[heroLoc1][heroLoc2 + 1] == 'boss' ||
                                matrix[heroLoc1][heroLoc2 + 1] == 'skeleton1' ||
                                matrix[heroLoc1][heroLoc2 + 1] == 'skeleton2' ||
                                matrix[heroLoc1][heroLoc2 + 1] == 'skeleton3' ||
                                matrix[heroLoc1][heroLoc2 + 1] == 'skeleton4' ||
                                matrix[heroLoc1][heroLoc2 + 1] == 'skeleton5'
                                ) {
                                    matrix[heroLoc1][heroLoc2] = 0;
                                    against = matrix[heroLoc1][heroLoc2 + 1];
                                    matrix[heroLoc1][heroLoc2 + 1] = 'clash';
                                    isClash = true;
                                    statON();
                                    drawingField();
                    } else {
                        matrix[heroLoc1][heroLoc2] = 'heroRight';
                        drawingField();
                    }
                } else if (heroLoc2 > fieldSize - 2 && isClash == false) {
                    matrix[heroLoc1][heroLoc2] = 'heroRight';
                    drawingField();
                }


                if(heroLoc2 <= fieldSize - 2 && isClash == true) {
                    if(matrix[heroLoc1][heroLoc2 + 1] == 0){
                        matrix[heroLoc1][heroLoc2] = against;
                        matrix[heroLoc1][heroLoc2 + 1] = 'heroRight';
                        isClash = false;
                        statOFF();
                        drawingField();
                    } else if (matrix[heroLoc1][heroLoc2 + 1] == 1 && isClash == true) {
                        matrix[heroLoc1][heroLoc2] = 'clash';
                        drawingField();
                    }
                } else if (isClash == true) {
                    matrix[heroLoc1][heroLoc2] = 'clash';
                    drawingField();
                }
                break;
            case " ": alert('Space function is not set up yet');
        }
    }
});