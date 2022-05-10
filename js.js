song="";
statius="";
objects=[];
function preload(){
    song= loadsound("alert.mp3")
}
function setup(){
    canvas=createCanvas(640,300);
    cnavas.center();
    video=createCapture(VIDEO);
    video.hide();
    od=ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}
function modelloaded(){
    console.log("model loaded!");
    statius=true;
    od.detect(video,gotresults);
}
function gotresults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,480,380);
    if(statius!=""){
        od.detect(video,gotresults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Object detected";
            document.getElementById("no").innerHTML="Number of objects detected: "+objects.length;

            fill("red");
            p=floor(objects[i].confidence*100);        
            text(objects[i].label+""+p+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("no").innerHTML="Baby found";
                song.stop();
            }
            else{
                song.play();
                document.getElementById("no").innerHTML="Baby not found";
            }
        }
        if(objects.length==0){
            song.play();
            document.getElementById("no").innerHTML="Baby not found";
        }
    }
}