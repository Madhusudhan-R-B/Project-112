Webcam.set({
    width:450,
    height:350,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="prediction_img" src="'+data_uri+'" style="width:450px; height:340px;">';
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1XP8K1Xkn/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!")
}

function predict(){
    img = document.getElementById("prediction_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("prediction").innerHTML = "You have made the " + results[0].label + " Hand-Gesture!"
        if(results[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Best"){
            document.getElementById("result_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
    }
}