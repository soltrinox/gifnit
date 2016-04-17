var videoObjects = [];
var gridObjects = 20;
var chosenTags = [];
var maxUnique = 3;
var termsMaster = ["Happy", "Sad", "Sexy", "Fruit","Bacon","Scared", "Rejection","Surprised","Long Day", "Tired", "Curiosity","Panic", "Attraction", "Disgust", "Rage", "Love"];
var huntGame = true;
var huntedTag;
var pairsGame = false;

generateGrid = function () {



    if (pairsGame) {
        for (var b=0; b<gridObjects/2; b++ ) {
            var temp1 = new videoObject;
            temp1.generateVideo();

            var temp2 = new videoObject;

            temp2.generateVideo();

            temp2.video.src = temp1.video.src;
        }
    }	else {
        for (var c=0; c<gridObjects; c++ ) {
            var temp = new videoObject;
            temp.generateVideo();
        }

        //Grab a random video and transform it into the hunted video.

        var huntedVideo = Math.random()*gridObjects.length;
        huntedVideo.tag = HuntGameTypeTag(chosenTags,termsMaster);

        huntedVideo.video.src = randomize(huntedTag);
    }


    shuffleArray(videoObjects);
    var index;
    for (index = 0; index < videoObjects.length; ++index) {
        document.getElementById("videoCells").appendChild(videoObjects[index].video);
    }

};


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */

function shuffleArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;

}

videoObject = function () {

    this.selected = false;
    this.tag = null;
    this.id = videoObjects.length+1;
    this.video = null;



    this.generateVideo = function () {

        this.tag = chooseUniquetag(chosenTags,termsMaster);
        this.video = document.createElement("img");
        this.video.src = randomize(this.tag);
        this.video.autoPlay = true;
        this.video.loop = true;

        this.video.onclick = function() {
            this.selected=!this.selected;
        };


        videoObjects.push(this);
    };


};

randomize = function (searchtag) {
    var pos = Math.round(Math.random()*50);
    var searchTerm = "http://api.riffsy.com/v1/search?&key=W1YXTAA7IH3W&tag=" + searchtag + "&limit=1&pos=" + pos;
    var jsonReturn = grabData(searchTerm);
    jsonReturn.results[0].media[0].gif.url;
};

grabData = function (url) {
    var request = new XMLHttpRequest();
    request.open('GET',url, false);

    request.onreadystatechange = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            return data = JSON.parse(request.responseText);
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };
    request.send();
}

chooseUniquetag = function (ignoreTerms,terms) {


    if (ignoreTerms.length>=maxUnique) {

        return ( ignoreTerms[Math.round(Math.random() * ignoreTerms.length)] );

    } else {

        if (ignoreTerms!=null || ignoreTerms!== undefined) {
            //Don't return a searchtag already chosen
            for (var j=0 ; j<ignoreTerms.length; j++)

            {
                for (var i=terms.length-1; i>=0; i--)

                {
                    if (terms[i] === ignoreTerms[j]) {
                        terms.splice(i, 1);
                    }
                }
            }
        }

        var chosenTag = terms[Math.round(Math.random() * terms.length)];

        chosenTags.push(chosenTag);
        return ( chosenTag);

    }
};



HuntGameTypeTag = function (ignoreTerms,terms) {

    if (ignoreTerms!=null || ignoreTerms!== undefined) {

        //Don't return a searchtag already chosen

        for (var j=0 ; j<ignoreTerms.length; j++)



        {

            for (var i=terms.length-1; i>=0; i--)



            {

                if (terms[i] === ignoreTerms[j]) {

                    terms.splice(i, 1);

                }

            }

        }

    }

    huntedTag = terms[Math.round(Math.random() * terms.length)];

    //document.getElementById(huntCategory).innerHTML = huntedTag;

    return(huntedTag);

};


