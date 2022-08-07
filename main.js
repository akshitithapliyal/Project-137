object_name="";
img="";
object=[];
status="";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded(){
    console.log("model is loaded and starting");
    status=true;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name=document.getElementById("input_id").value;
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status!=""){
        objectDetector.detect(video, gotresults);
for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML = "Status : Detected Objects";
    fill(130, 200, 40);
    percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+" %",object[i].x+15,object[i].y+15);
    noFill();
    stroke(230, 99, 100);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    if(object[i].label==object_name){
        video.stop();
        objectDetector.detect(gotresults);
        document.getElementById("object_found").innerHTML=object_name+"Found";
        synth=window.speechSynthesis;
        utterThis=new SpeechSynthesisUtterance(object_name+"Found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("object_found").innerHTML=object_name+"Not Found";
    }
}
}
}