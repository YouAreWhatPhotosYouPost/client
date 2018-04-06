function processImage() {
    localStorage.removeItem("urlPhoto");
    var subscriptionKey = "b5eef236b27247f3b5e4c25b30948ca9";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
    };

    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
    .done(function(data) {
        // Show formatted JSON on webpage.
        console.log("---", data[0].faceAttributes.emotion);
        const emotion = data[0].faceAttributes.emotion;
        $('#emotionList').empty();
        $("#emotionList").append(`
            <br/><br/>
            <table class="table" width="100">
                <thead >
                <tr>
                    <th><b>Emotion</b></th>
                    <th><b>Point<b/></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Anger</th>
                        <th>${emotion.anger}</th>
                    </tr>
                    <tr>
                        <th>Contempt</th>
                        <th>${emotion.contempt}</th>
                    </tr>
                    <tr>
                        <th>Disgust</th>
                        <th>${emotion.disgust}</th>
                    </tr>
                    <tr>
                        <th>Fear</th>
                        <th>${emotion.fear}</th>
                    </tr>
                    <tr>
                        <th>Happiness</th>
                        <th>${emotion.happiness}</th>
                    </tr>
                    <tr>
                        <th>Neutral</th>
                        <th>${emotion.neutral}</th>
                    </tr>
                    <tr>
                        <th>Sadness</th>
                        <th>${emotion.sadness}</th>
                    </tr>
                    <tr>
                        <th>Surprise</th>
                        <th>${emotion.surprise}</th>
                    </tr>
                </tbody>
            </table>
        `)
        data[0].urlImage = sourceImageUrl
        axios.post('http://localhost:3000/faceAnalyze', {
            data: data,
            dataType: "json"
        })
        .then(function (response) {
            console.log("response---", response)
            let idImage = response.data.data._id
            let arrEmotion = [];
            for (var key in emotion) {
                if (emotion.hasOwnProperty(key)) {
                    arrEmotion.push([key, emotion[key]])
                }
            }
            
            let highestEmotion = arrEmotion[0]
            console.log("***", highestEmotion)
            for(let i in arrEmotion) {
                if(arrEmotion[i][1] > highestEmotion[1]) {
                    highestEmotion = arrEmotion[i];
                }
            }
            showItunes(highestEmotion, idImage);
        })
        .catch(function (error) {
            console.log("error---", error)
        })
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
};