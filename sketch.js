function preload(){
    bg1 = loadImage("./assets/bg.jpg");
    bg2 = loadImage("./assets/bg2.png");
    play = loadImage("./assets/play.png");
    logo = loadImage("./assets/logo.png");
    score = loadImage("./assets/score.png");
    livesImg= loadImage("./assets/lives.png");
    haha= loadImage("./assets/haha.png");
    resetImg = loadImage("./assets/reset.png");

    level1text = loadImage("./assets/level1text.png");
    level2text = loadImage("./assets/level2text.png");
    message = loadImage("./assets/message.png");

    girlRunning = loadAnimation("./assets/girlrunning1.png","./assets/girlrunning2.png","./assets/girlrunning3.png","./assets/girlrunning4.png","./assets/girlrunning5.png","./assets/girlrunning6.png");
    girlStanding = loadAnimation("./assets/girlrunning3.png");

    bottle = loadImage("./assets/bottle.png");
    can = loadImage("./assets/can.png");
    chips = loadImage("./assets/chips.png");
    peel = loadImage("./assets/peel.png");

    crab = loadImage("./assets/crab.png");
    jelly = loadImage("./assets/jellyfish.png");

    redBinImg = loadImage("./assets/redBin.png");
    greenBinImg = loadImage("./assets/greenBin.png");

    bg3 = loadImage("./assets/bg3.jpg");
}

function setup(){
    createCanvas(windowWidth-20, windowHeight);

    gameState = "start";
    level1 = "start";
    level2 = "start";

    playButton = createSprite(width/2,height-250);
    playButton.addImage(play);
    playButton.scale = 0.75;

    reset = createSprite(width/2,height-275);
    reset.addImage(resetImg);
    reset.scale = 0.2;

    infinitebg = createSprite(width/2,height/2);
    infinitebg.addImage(bg2);
    infinitebg.scale = 2.2;
    infinitebg.velocityX = -7;

    ground = createSprite(width/2,height-50,width,20);
    ground.visible = false;

    girl = createSprite(150,height-200);
    girl.addAnimation("running",girlRunning);
    girl.addAnimation("standing",girlStanding);
    girl.scale = 0.8;
    girl.setCollider("rectangle",0,0,150,200);

    trashGroup= createGroup();
    trashCount = 0;

    obstacleGroup = createGroup();
    life = 3;

    cansGroup = createGroup();
    chipsGroup = createGroup();
    peelsGroup = createGroup();
    bottlesGroup = createGroup();

    redBin = createSprite(width/2-200,height-100);
    redBin.addImage(redBinImg);
    redBin.scale = 0.3;

    greenBin = createSprite(width/2+200,height-100);
    greenBin.addImage(greenBinImg);
    greenBin.scale = 0.6;

    rcount = 0;
    ncount = 0;


}

function draw(){
   if(gameState == "start"){
    background(bg1);

    drawSprites();
    girl.visible = false;
    infinitebg.visible = false;
    reset.visible = false;
    redBin.visible = false;
    greenBin.visible = false;

    push();
    imageMode(CENTER);
    image(logo,width/2,height-430,600,200);
    pop();

    if(keyDown("enter")){
        gameState = "level1intro";
    }

    
   }

   if(gameState == "level1intro"){
    background(bg1);
    push();
    imageMode(CENTER);
    image(level1text,width/2,height/2,1000,700);
    pop();

    textAlign(CENTER);
    textSize(25);
    fill("black");
    text("Press space to play!",width/2,height/2-30);

    if(keyDown("space")){
        gameState = "level1";
    }

   }

   if(gameState == "level1"){
    background("purple");
    drawSprites();
    playButton.visible = false;
    reset.visible = false;
    girl.visible = true;
    infinitebg.visible = true;
    redBin.visible = false;
    greenBin.visible = false;

    image(livesImg,45,100,80,30);
    textSize(25);
    fill("orange");
    text(life,150,125);

    image(score,40,50,100,30);
    textSize(25);
    fill("blue");
    text(trashCount,150,73);

    if(level1 == "start"){
        infinitebg.velocityX = -7;
        if(keyDown("up")&&girl.y >200){
            girl.velocityY = -30;
        }
        girl.velocityY +=2;
        girl.collide(ground);
        girl.changeAnimation("running");
    
        if(infinitebg.x < 0){
            infinitebg.x = infinitebg.width/2;
        }
    
        
        createtrash();
        for(var i = 0;i<trashGroup.length;i++){
            if(girl.isTouching(trashGroup[i])){
                trashGroup[i].destroy();
                trashCount +=1;
            }
        }
        
        
        createObstacles();
        for(var i = 0;i<obstacleGroup.length;i++){
            if(girl.isTouching(obstacleGroup[i])){
                life -= 1;
                level1 = "hit";
            }
        }
    
        if(life==0){
            obstacleGroup.destroyEach();
            trashGroup.destroyEach();
            gameState = "gameOver";
        }
    
        if(trashCount == 15){
            gameState = "level2intro";
        }
    }

    if(level1 == "hit"){
        image(haha,girl.x+50,girl.y-100,100,100);
        girl.changeAnimation("standing");
        obstacleGroup.setVelocityXEach(0);
        trashGroup.setVelocityXEach(0);
        infinitebg.velocityX = 0;
        girl.velocityY = 0;

        textAlign(CENTER);
        textSize(25);
        fill("black");
        text("Press space to play!",width/2,height/2);

        if(keyDown("space")){
            level1 = "start";
            obstacleGroup.destroyEach();
            trashGroup.destroyEach();
        }
    }

    
    
   }

   if(gameState == "level2intro"){
    background(bg3);

    push();
    imageMode(CENTER);
    image(level2text,width/2,height/2,1000,700);
    pop();

    textAlign(CENTER);
    textSize(25);
    fill("black");
    text("Press space to play!",width/2-30,height/2+75);

    if(keyDown("space")){
        gameState = "level2";
        life = 3;
    }

   }

   if(gameState == "level2"){
    background(bg3);
    drawSprites();
    girl.visible = false;
    infinitebg.visible = false;
    reset.visible = false;
    playButton.visible = false;
    redBin.visible = true;
    greenBin.visible = true;

    if(level2 == "start"){
        var r = Math.round(random(1,4));
        if(frameCount%40 == 0){
            if(r == 1){
                createCans();
            }
            else if(r == 2){
                createBottles();
            }

            else if(r == 3){
                createPeels();
            }
            else if(r == 4){
                createChips();
            }
            
        }

        if(keyDown("left")){
            greenBin.x -= 5;
        }
        if(keyDown("right")){
            greenBin.x += 5;
        }

        if(keyDown("a")){
            redBin.x -= 5;
        }
        if(keyDown("d")){
            redBin.x += 5;
        }

        imageMode(CENTER);
        image(livesImg,width/2,20,80,30);
        textSize(25);
        fill("black");
        textAlign(CENTER);
        text(life,width/2+50,30);

        text("Red Score: "+ncount,100,30);
        text("Green Score: "+rcount,width-120,30);

        for(var i = 0;i<peelsGroup.length;i++){
            if(peelsGroup[i].isTouching(redBin)){
                peelsGroup[i].destroy();
                ncount+=1;
            }
        }

        for(var i = 0;i<chipsGroup.length;i++){
            if(chipsGroup[i].isTouching(redBin)){
                chipsGroup[i].destroy();
                ncount+=1;
            }
        }

        for(var i = 0;i<cansGroup.length;i++){
            if(cansGroup[i].isTouching(greenBin)){
                cansGroup[i].destroy();
                rcount+=1;
            }
        }

        for(var i = 0;i<bottlesGroup.length;i++){
            if(bottlesGroup[i].isTouching(greenBin)){
                bottlesGroup[i].destroy();
                rcount+=1;
            }
        }

        if(peelsGroup.isTouching(greenBin)||chipsGroup.isTouching(greenBin)||cansGroup.isTouching(redBin)||bottlesGroup.isTouching(redBin)){
            life -= 1;
            level2 = "hit";
        }

        if(life == 0){
            peelsGroup.destroyEach();
            cansGroup.destroyEach();
            chipsGroup.destroyEach();
            bottlesGroup.destroyEach();
            gameState = "gameOver";
        }

        if(rcount == 10&&ncount==10){
            gameState = "win";
        }
    }

    if(level2 == "hit"){
        image(haha,width/2-20,height/2-150,100,100);
        peelsGroup.setVelocityYEach(0);
        chipsGroup.setVelocityYEach(0);
        cansGroup.setVelocityYEach(0);
        bottlesGroup.setVelocityYEach(0);

        peelsGroup.setLifetimeEach(-1);
        chipsGroup.setLifetimeEach(-1);
        cansGroup.setLifetimeEach(-1);
        bottlesGroup.setLifetimeEach(-1);


        textAlign(CENTER);
        textSize(25);
        fill("black");
        text("Press space to play!",width/2,height/2);

        if(keyDown("space")){
            level2 = "start";
            peelsGroup.destroyEach();
            chipsGroup.destroyEach();
            cansGroup.destroyEach();
            bottlesGroup.destroyEach();
        }
    }

    
   }

   if(gameState == "gameOver"){
    background(bg1);

    fill("lightseagreen");
    rectMode(CENTER);
    rect(width/2,height/2,250,75);

    textSize(40);
    fill("white");
    textAlign(CENTER);
    text("Game Over!",width/2,height/2+10);

    drawSprites();
    girl.visible = false;
    infinitebg.visible = false;
    playButton.visible = false;
    
   }

   if(gameState == "win"){
        background(bg1);
        fill("lightseagreen");
        rectMode(CENTER);
        rect(width/2,200,300,75);

        textSize(40);
        fill("white");
        textAlign(CENTER);
        text("Congratulations!",width/2,210);

        imageMode(CENTER);
        image(message,width/2,height/2+100);

   }

}

function createtrash(){
    if(frameCount%(Math.round(random(70,120)))==0){
        trash = createSprite(width,height-100);
        trash.velocityX = -7;
        var rand = Math.round(random(1,4));
        switch(rand){
            case 1: trash.addImage(bottle)
            trash.scale = 0.3
            break
            case 2: trash.addImage(can)
            trash.scale = 0.3
            break
            case 3: trash.addImage(chips)
            trash.scale = 0.2
            break
            case 4: trash.addImage(peel)
            trash.scale = 0.3
            break
            default: break
        }
        trash.lifetime = 2000;
        trashGroup.add(trash);
    }
}

function createObstacles(){
    if(frameCount%(Math.round(random(125,150)))==0){
        obstacle = createSprite(width,height-100);
        obstacle.velocityX = -7;
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(crab)
            break
            case 2: obstacle.addImage(jelly)
            break
            default: break
        }
        obstacle.scale = 0.25;
        obstacle.lifetime = 2000;
        obstacleGroup.add(obstacle);
    }
}

function createCans(){

        c = createSprite(random(100,width-100),-60);
        c.addImage(can);
        c.velocityY = 7;
        c.scale = 0.3;
        cansGroup.add(c);
        c.lifetime = 500;
    
}

function createBottles(){
    
        c = createSprite(random(100,width-100),-10);
        c.addImage(bottle);
        c.velocityY = 7;
        c.scale = 0.3;
        bottlesGroup.add(c);
        c.lifetime = 500;
    
}

function createPeels(){
    
        c = createSprite(random(100,width-100),-100);
        c.addImage(peel);
        c.velocityY = 7;
        c.scale = 0.3;
        peelsGroup.add(c);
        c.lifetime = 500;
    
}

function createChips(){
    
        c = createSprite(random(100,width-100),-120);
        c.addImage(chips);
        c.velocityY = 7;
        c.scale = 0.3;
        chipsGroup.add(c);
        c.lifetime = 500;
    
}
