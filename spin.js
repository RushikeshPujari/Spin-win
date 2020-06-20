Prizes_config={
    count:12,
    prize_names:[
        "3000 Credits","35% off", "Hard Luck","70% OFF" ,"Swagapack","100% Off","Netflix","50% off","Amazon Voucher","2 Extra Spin","CB Tshirt" , "CB Book"
    ]
}
spinn = true;
//console.log(Prizes_config.prize_names[2])
count= 1;
var button;
console.log(count);
let config = {
    type: Phaser.CANVAS,
    width:  1200,
    height: 800,
    scene:{
        preload:Preload,
        create:Create, 
        update: Update
    },
    audio: {
        disableWebAudio: true
    }
    
 };

let game = new Phaser.Game(config);

function Preload(){
    console.log("Preload");
    console.log(this)
    this.load.audioSprite('Load', 'Audio/loadingWheel.json', [
        'Audio/loadingWheel.ogg',
        'Audio/loadingWheel.mp3'
    ]);
    this.load.image('button2', 'Assets/button2.jpg');
    this.load.image('background','Assets/back.jpg');//(key,url)
    this.load.image('wheel','Assets/wheel.png');//(key,url)
    this.load.image('pin','Assets/pin.png');//(key,url)
    this.load.image('stand','Assets/stand.png');//(key,url)
    //game.load.spritesheet('button','Assets/button3.png',189,400);//(key,url)
    //this.load.spritesheet('button2', 'Assets/button2.png', { frameWidth: 300, frameHeight: 80 });
    
}
function Create(){
    console.log("Create");
    let W = game.config.width;
    let H = game.config.height;
//background image
    
    let background = this.add.sprite(0,0,'background');//(x,y,"img name")
    background.setPosition(W/2+250,H/2);
    background.setScale(0.40);
    

//button image
    let button3 = this.add.sprite(300,H/2,'button2');//(x,y,"img name")
    button3.setScale(0.20);
    
    //let button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

    
    //button.onInputOver.add(over, this);

    
    
//stand image
    this.stand = this.add.sprite(W/2+250,H/2+280,'stand');//(x,y,"img name")
    this.stand.setScale(0.30);
    
//wheel image
    this.wheel = this.add.sprite(W/2+250,H/2,'wheel');//(x,y,"img name")
    this.wheel.setScale(0.28);
    
//pin image
    this.pin = this.add.sprite(W/2+250,H/2-280,'pin');//(x,y,"img name")
    this.pin.setScale(0.28);

//Event listner for mouse press    
    //this.input.on('pointerdown',spinwheel,this);
    
    var sprite = this.add.sprite(300,H/2+40,button3);
sprite.setInteractive();
sprite.on('pointerdown',spinwheel,this);
    
//add text
    font_style={
        font: "bold 35px Arial",
        alignment: "center",
        color: "red"
    }
    this.game_text= this.add.text(game.config.width/2-450,game.config.height/2-200,"Welcome to spin and win",font_style);
    this.game_text1= this.add.text(game.config.width/2+350,50,"Spin Left "+count,font_style);
}
function Update(){
    console.log("uPDATE");
    //this.wheel.angle += 1;
    //transperrcy dr=ecreases
    if(count==0){
    this.wheel.alpha -= 0.01;
    this.stand.alpha -= 0.01;
    this.pin.alpha -= 0.01;
    }
    else{
       // this.wheel.alpha += 1;
        //this.stand.alpha += 1;
        //this.pin.alpha += 1;
        
    }
}

function spinwheel(){
    console.log("initial ",spinn);
    
    console.log(count);
if( count>0){
    //as we are sending "this" so we can acces game_text
    //To change text we have a property called "setText"
    let round = Phaser.Math.Between(2,5);
    let degree = Phaser.Math.Between(0,12)*30;
    
    let idx = Prizes_config.count - 1 - Math.floor(degree/(360/Prizes_config.count));  
    
    let total_angle= round*360 + degree;
    console.log(total_angle);
    //this.game_text.setText("You have Clicked Mouse");
    
    music = this.sound.addAudioSprite('Load');

    music.play('title');

    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function(){
            count--;
            console.log(count);
            this.game_text.setText("you Won "+Prizes_config.prize_names[idx]);
            
            if(Prizes_config.prize_names[idx]=="2 Extra Spin"){
                count+=2;
            }
            this.game_text1.setText("Spin Left "+count);
            
        }
    });
                
}    
    
}