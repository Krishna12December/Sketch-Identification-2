score = 0;
draw_sketch = 0;
answer_holder = 0;
random_number = 0;

function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(10);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    console.log(results);
    draw_sketch = (results[0].label);
    document.getElementById('label').innerHTML = 'Your Sketch: ' + draw_sketch;

    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

function check_sketch(){
    if (draw_sketch == sketch){
        answer_holder = "set";
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }

}
