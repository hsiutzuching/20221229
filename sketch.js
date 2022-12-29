
var face_x = []
var face_y = []
var face_size = []
var face_num = 6 //臉的數量在這改即可
var song
var songIsplay=false//設定此變數為 假(fasle)，收到按下滑鼠把變數改為真，音樂開始播放
var amp
var vol
var music_btn_pressed
var mouse_btn_pressed
var Speech_btn_pressed
var camera_btn_pressed
var myRec = new p5.SpeechRec();
var result

var colors = "ff0a54-ff477e-ff5c8a-ff7096-ff85a1".split("-").map(a=>"#"+a)
var colors_r = "ff99ac-fbb1bd-f9bec7-f7cad0".split("-").map(a=>"#"+a)
var clr,clr_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX = [] //所有花的 X 軸，list串列 ， array 陣列
var positionlistY = [] //所有花的 Y 軸，list串列 ， array 陣列
var clrList = [] //所有花瓣顏色
var clr_r_List = [] //所有花圓心顏色
var sizeList = []//所有花的大小
 
// +++++++++++++++手勢辨識_變數宣告區++++++++++++++++++
let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];//記錄所有(手勢)共21點，所有資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d // 後面變數名稱，8代表食指最上端，4代表大拇指最上端，大寫X、Y、Z 手指所在的座標，d代表4與8距離(現只取X、Y軸)
let pointerX14,pointerY14,pointerX16,pointerY16//用四個變數紀錄第14點(pointerX14,pointerY14)，第16點(pointerX16,pointerY16)
// +++++++++++++++++++++++++++++++++++++++++++++++++


function preload(){
song = loadSound("Chasing - NEFFEX拷貝.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)

//按鈕一
music_btn = createButton("音樂")
music_btn.position(10,10)
music_btn.size(200, 100);
music_btn.style('background-color', '#b8bedd'); //按鈕背景色
music_btn.style('font-size','30px');
music_btn.style('color','white');
music_btn.mousePressed(music_btn_pressed)

//按鈕二
mouse_btn = createButton("暫停音樂")
mouse_btn.position(370,10)
mouse_btn.size(200, 100);
mouse_btn.style('background-color', '#b8bedd');
mouse_btn.style('font-size', '30px');
mouse_btn.style('color', 'white');
mouse_btn.mousePressed(mouse_btn_pressed)

//按鈕三
Speech_btn = createButton("語音辨識(播音樂/不要播)")
Speech_btn.position(740,10)
Speech_btn.size(200, 100);
Speech_btn.style('background-color', '#b8bedd');
Speech_btn.style('font-size', '30px');
Speech_btn.style('color', 'white');
Speech_btn.mousePressed(Speech_btn_pressed)

//按鈕四
camera_btn = createButton("相機")
camera_btn.position(1110,10)
camera_btn.size(200, 100);
camera_btn.style('background-color', '#b8bedd'); //按鈕背景色
camera_btn.style('font-size','30px');
camera_btn.style('color','white');
camera_btn.mousePressed(camera_btn_pressed)



face_num =20
for(var i=0;i<face_num;i++){
    face_size[i]=random(100,300)//臉的大小100~300
    face_x[i]=random(0,width)
    face_y[i]=random(0,height)

    for(var k=0;k<10;k++){ //從 J=0 開始(第一朵花) ~ J=9 (第十朵花) 
      positionListX.push(random(width))
      positionlistY.push(random(height))
      clrList.push(colors[int(random(colors_r.length))])
      clr_r_List.push(colors_r[int(random(colors_r.length))])
      sizeList.push(random(0.2,0.7))
    
      //畫圖
      push() 
        translate(positionListX[k],positionlistY[k]) //花的座標，原點移到視窗的中心點
        clr = clrList[k]
        clr_r = clr_r_List[k]
        drawFace(clr,clr_r,sizeList[k])
      pop()
      }


//++++++++++++++++取得攝影機影像並聯到手勢辨識++++++++++++++++++++++  
video = createCapture(VIDEO); //取的攝影機的權限，將影像畫面存到Video
video.size(width, height); //影像大小為整個視窗大小

handpose = ml5.handpose(video, modelReady); //把Video影像執行辨識(只執行手部辨識)，辨識後，會執行modelReady function

// This sets up an event that fills the global variable "predictions"
// with an array every time new hand poses are detected
handpose.on("predict", (results) => {
predictions = results; //將辨識結果放到predictions變數內
});

// Hide the video element, and just show the canvas
video.hide(); //隱藏Viedo
//+++++++++++++++++++++++++++++++++++++++++++++++++++++ 

  }
}

function modelReady() {
  console.log("Model ready!");
}


function music_btn_pressed(){
  song.play()
  songIsplay = true
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#b8bedd');
  mouse_btn.style('background-color', '#8ecae6');
  Speech_btn.style('background-color', '#8ecae6');
  camera_btn.style('background-color', '#8ecae6')
  }
  
  function mouse_btn_pressed(){
  song.pause()
  songIsplay = false
  music_btn.style('background-color', '#8ecae6');
  mouse_btn.style('background-color', '#b8bedd');
  Speech_btn.style('background-color', '#8ecae6');
  camera_btn.style('background-color', '#8ecae6')
  }
  
  function Speech_btn_pressed(){
  music_btn.style('background-color', '#8ecae6');
  mouse_btn.style('background-color', '#8ecae6');
  Speech_btn.style('background-color', '#b8bedd');
  camera_btn.style('background-color', '##8ecae6')
  myRec.onResult = showResult;
  myRec.start();
  
  }

  function camera_btn_pressed(){
    music_btn.style('background-color', '#8ecae6');
    mouse_btn.style('background-color', '#8ecae6');
    Speech_btn.style('background-color', '#8ecae6');
    camera_btn.style('background-color', '#b8bedd')
    }
  
  function showResult(){
  if(myRec.resultValuetrue) {
  result = myRec.resultString
  if(myRec.resultString="播音樂")
  {
  music_btn_pressed()
  }
  if(myRec.resultString==="不要播")
  {
  
         mouse_btn_pressed()
        }
  }
  }

function drawFace(){
  for(var j=0;j<face_num;j++){
    push() 
    var f_s = face_size[j]
    translate(face_x[j],face_y[j])
 
    noStroke()
    fill("#fde4cf")
    
    ellipse(0,0,f_s)//臉
    
    fill(255)
    stroke(0)
    ellipse(f_s/6,-f_s/20,f_s/6.6)//左眼睛
    ellipse(-f_s/6,-f_s/20,f_s/6.6)//右眼睛
 
    fill(0)
    ellipse(f_s/6+map(mouseX,0,width,-f_s/60,f_s/30),-f_s/20+map(mouseY,0,height,-f_s/60,f_s/30),f_s/10)//左眼珠
    ellipse(-f_s/6+map(mouseX,0,width,-f_s/60,f_s/30),-f_s/20+map(mouseY,0,height,-f_s/60,f_s/30),f_s/10)//右眼珠
 
    noStroke()
    fill("#432818")
    arc(0,-f_s/5,f_s/1.2,f_s/1.5,180,360)//瀏海
    fill("#fde4cf")
    noStroke()
    triangle(-f_s/7.5,-f_s/2.7,-f_s/10,-f_s/5,-f_s/4.2,-f_s/5)
    triangle(0,-f_s/3.3,-f_s/30,-f_s/5,f_s/30,-f_s/5)
    triangle(f_s/8.5,-f_s/3.1,f_s/20,-f_s/5,f_s/7.5,-f_s/5)
   
    fill("#432818")
    noStroke()
    beginShape()//左邊頭髮
       curveVertex(f_s/5,-f_s/1.8)
       curveVertex(f_s/5,-f_s/1.8)
       curveVertex(-f_s/3.75,-f_s/1.8)
       curveVertex(-f_s/2,-f_s/5)
       curveVertex(-f_s/1.875,f_s/2.1)
       curveVertex(-f_s/7.5,f_s/2.1)
       curveVertex(-f_s/3.1,f_s/3.3)
       curveVertex(-f_s/2.7,-f_s/10)
       curveVertex(-f_s/6.6,-f_s/4.2)
       curveVertex(f_s/30,-f_s/2.5)
       curveVertex(f_s/30,-f_s/2.5)
    endShape()
 
    beginShape()//右邊頭髮
       curveVertex(0,-f_s/1.8)
       curveVertex(0,-f_s/1.8)
       curveVertex(f_s/3.75,-f_s/1.8)
       curveVertex(f_s/2,-f_s/5)
       curveVertex(f_s/1.875,f_s/2.1)
       curveVertex(f_s/7.5,f_s/2.1)
       curveVertex(f_s/3.1,f_s/3.3)
       curveVertex(f_s/2.7,-f_s/10)
       curveVertex(f_s/6.6,-f_s/4.2)
       curveVertex(-f_s/30,-f_s/2.5)
       curveVertex(-f_s/30,-f_s/2.5)
    endShape()
 
    fill("#5e503f") 
    beginShape();//左邊眉毛
       curveVertex(-f_s/3.75,-f_s/6.3)
       curveVertex(-f_s/3.75,-f_s/6.3)
       curveVertex(-f_s/5.45,-f_s/5.7)
       curveVertex(-f_s/10,-f_s/5.6)
       curveVertex(-f_s/13,-f_s/5.7)
       curveVertex(-f_s/12,-f_s/7.1)
       curveVertex(-f_s/12,-f_s/7.1)
    endShape()
 
    fill("#5e503f") 
    beginShape();//右邊眉毛
       curveVertex(f_s/3.75,-f_s/6.3)
       curveVertex(f_s/3.75,-f_s/6.3)
       curveVertex(f_s/5.45,-f_s/5.7)
       curveVertex(f_s/10,-f_s/5.6)
       curveVertex(f_s/13,-f_s/5.7)
       curveVertex(f_s/12,-f_s/7.1)
       curveVertex(f_s/12,-f_s/7.1)
    endShape()
    
   fill("#fde4cf")
   ellipse(-f_s/2.7,0,f_s/7.5)//左耳
   ellipse(f_s/2.7,0,f_s/7.5)//右耳
 
   noFill()
   stroke("#582f0e")
   curve(f_s/6.6,f_s/20,f_s/2.7,f_s/20,f_s/2.6,-f_s/30,f_s/7.5,-f_s/20)//右耳渦
   curve(-f_s/6.6,f_s/20,-f_s/2.7,f_s/20,-f_s/2.6,-f_s/30,-f_s/7.5,-f_s/20)//左耳渦
 
   
   fill(255)//鼻子
   line(f_s/150,f_s/20,-f_s/60,f_s/7.5) 
   line(f_s/30,f_s/7.5,-f_s/60,f_s/7.5) 
 
   noStroke()//左腮紅
   fill(clr_r)
   ellipse(-f_s/4,f_s/10,f_s/7.5,f_s/15)
   stroke("#e71d36")
   // strokeWeight(3)
   line(-f_s/4.6,f_s/8.5,-f_s/4.2,f_s/12)//腮紅內線
   line(-f_s/4,f_s/8.5,-f_s/3.75,f_s/12)//腮紅內線
 
   noStroke()//右腮紅
   fill(clr_r)
   ellipse(f_s/4,f_s/10,f_s/7.5,f_s/15)
   stroke("#e71d36")
   // strokeWeight(3)
   line(f_s/3.5,f_s/8.5,f_s/3.75,f_s/12)//腮紅內線
   line(f_s/4,f_s/8.5,f_s/4.2,f_s/12)//腮紅內線
 
   if(mouseIsPressed)//如果按下滑鼠會
     {
       fill(clr)
       noStroke()
       arc(0,f_s/4,f_s/5,f_s/6.6,0,180)//嘴巴
     }
     else//否則
     {
       fill(clr)
       noStroke()
       arc(0,f_s/4,f_s/5,f_s/6.6,0,180)//嘴巴弧度 上 arc弧度，全嘴唇，pi角度
     }
 
       
       if(!songIsplay){
         fill("#fde4cf")
         noStroke()
         ellipse(f_s/2.7,0,f_s/7.5)//右耳
         ellipse(-f_s/2.7,0,f_s/7.5)//左耳
         stroke("#582f0e");
         curve(f_s/6.6,f_s/20,f_s/2.7,f_s/20,f_s/2.6,-f_s/30,f_s/7.5,-f_s/20);//右耳渦
         curve(-f_s/6.6,f_s/20,-f_s/2.7,f_s/20,-f_s/2.6,-f_s/30,-f_s/7.5,-f_s/20);//左耳渦
          //沒有播放
       }
       else{
       vol = amp.getLevel() //取得聲音值(值為0~1之間)
       // console.log(vol)//顯示網頁中console 數字
       fill("#fde4cf")
       noStroke()
       ellipse(f_s/2.7,0,f_s/5)//右耳
       ellipse(-f_s/2.7,0,f_s/5)//左耳
       noFill();
       curve(f_s/6.6,f_s/20,f_s/2.7,f_s/20,f_s/2.6,-f_s/30,f_s/7.5,-f_s/10);//右耳渦
       curve(-f_s/6.6,f_s/20,-f_s/2.7,f_s/20,-f_s/2.6,-f_s/30,-f_s/7.5,-f_s/10);//左耳渦
     }
     noFill()
     pop()
 
     }
     }

  
function draw() {
  background("#e2eafc");

  //++++++++++++++++++++++++++++++++++++++++++++++++++
   //攝影機反向
  translate(width, 0);
  scale(-1, 1);
    //+++++++++
  background(255);
    image(video,0,0,width,height)
  drawKeypoints(); //取得手指位置

  push()
  translate(width/2,height/2)
  drawFace("#e2eafc")
  
  d= dist(pointerX8,pointerY8,pointerX4,pointerY4)
// //++++++++++++++++++++++++++++++++++++++++++++++++++++
  


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function drawKeypoints() {
      for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
          const keypoint = prediction.landmarks[j];
          fill(0, 255, 0);
          // noStroke();
          if (j == 8) {     //食指上端
            pointerX8 = map(keypoint[0],0,640,0,width)
            pointerY8 = map(keypoint[1],0,480,0,height)
            pointerZ8 = keypoint[2] //keypoint[2]代表Z(食指座標)
            console.log(pointerZ8)
            // if(pointerZ8<-30)
            // {
            //   R_draw(pointerX8,pointerY8)
            // }
            rect(pointerX8, pointerY8, 30, 30); //食指圓點顯示
          } else
          if (j == 4) {   //大拇指上端
          fill(255,0,0)
            pointerX4 = map(keypoint[0],0,640,0,width)
            pointerY4 = map(keypoint[1],0,480,0,height)
            // pointerZ = keypoint[2]
            // print(pointerZ)
            rect(pointerX4, pointerY4, 30, 30); //大拇指圓點顯示
        
          } else
          if (j == 14) {  // 無名指第三關節
            pointerX14 = keypoint[0]; 
            pointerY14 =  keypoint[1];
          } else
          if (j == 16) {  // 無名指上端
            pointerX16 = keypoint[0];
            pointerY16 =  keypoint[1];
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          }
          
        }
      
      }
    }
}
function r_Face(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
	if(pointerY14<pointerY16){
		drawFace(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+1)) //放大縮小，無名指有彎曲
	}else
	{
		//無名指未彎曲，花做旋轉
		rotate(frameCount/20)
		drawFace(F_clr,F_clr_r,F_size)
			
	}
	pop()
}

function R_draw(handX,handY)
{
	//紀錄資料
  positionListX.push(handX)
  positionlistY.push(handY)
  clrList.push(colors[int(random(colors_r.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.2,0.7))
  let data_length= positionListX.length
  //畫圖
  push() 
    translate(positionListX[data_length-1],positionlistY[data_length-1]) //花的座標，原點移到視窗的中心點
    clr = clrList[data_length-1]
    clr_r = clr_r_List[data_length-1]
    drawFace(clr,clr_r,sizeList[data_length-1])
  pop()

}