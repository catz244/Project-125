noseX = 0;
noseY = 0;
difference = 0;
leftwristX = 0;
rightwristX = 0;

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(600, 160);

    video = createCapture(VIDEO);
    video.size(400, 360);
    video.position(50, 160);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background('#595959');
    fill('#f5e80c');
    textSize(difference);
    text("Cathy", noseX, noseY);
}

function modelLoaded() {
    console.log("Model is Loaded!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose X = " + noseX + "nose Y = " + noseY);

        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;
        difference = floor(leftwristX - rightwristX);
        console.log("leftwrist X = " + leftwristX + "rightwrist X = " + rightwristX + "difference = " + difference);
        document.getElementById("font_size").innerHTML = difference;
    }
}