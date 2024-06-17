var clientBugArray = [];


let bugObject = function(enterName,enterImage,enterWeight,enterSize) {
    this.ID = Math.random().toString(16).slice(5);
    this.bName = enterName;
    this.bImage = enterImage;
    this.bWeight = enterWeight;
    this.bSize = enterSize;
}

function createList() {
     $.get("/getAllBugs", function(data,status){
        clientBugArray = data;
        let myUL = document.getElementById("unorderedBugList");
        myUL.innerHTML = "";
        for (let i = 0; i < clientBugArray.length; i++) {
            var li = document.createElement('li');
            li.textContent = "Bug: " + clientBugArray[i].bName + ", Weight: " + clientBugArray[i].bWeight + ", Size: " + clientBugArray[i].bSize;
            li.onclick = function() {
                window.open(clientBugArray[i].bImage, '_blank').focus();
            };
            myUL.appendChild(li);
        }
    });
}
$(document).on("pagebeforeshow", "#collection", function (event) { // have to use jQuery
    createList();
});
var chosenBug;
function generateQuestion() {
    let myImg = document.getElementById("quizImage");
    myImg.src = "";
    $.get("/getAllBugs", function(data,status){
        clientBugArray = data;
        chosenBug = clientBugArray[Math.floor(Math.random()*clientBugArray.length)];
        let myH2 = document.getElementById("quizQuestion");
        if (Math.floor(Math.random()*3) > 1) {
            myH2.textContent = "??? Which bug has a weight of "+chosenBug.bWeight+"? ???";
        } else {
            if (Math.floor(Math.random()*2) > 1) {
                myH2.textContent = "??? Which bug looks like this? ???";
                let myImg = document.getElementById("quizImage");
                myImg.src = chosenBug.bImage;

            } else {
                myH2.textContent = "??? Which bug has a size of "+chosenBug.bSize+"? ???";
            }
        }
    });
}
$(document).on("pagebeforeshow", "#quiz", function (event) { // have to use jQuery
    generateQuestion();
});

document.addEventListener("DOMContentLoaded", function (event) {

this.getElementById("submitBug").addEventListener("click", function() {

    let bName = document.getElementById("bugName").value;
    let bImage = document.getElementById("bugImage").value;
    let bWeight = document.getElementById("bugWeight").value;
    let bSize = document.getElementById("bugSize").value;

    let newBug = new bugObject(bName,bImage,bWeight,bSize);
    
    $.ajax({
        url: "/AddBug",
        type: "POST",
        data:JSON.stringify(newBug),
        contentType:"application/json; charset=utf-8",
        success: function(result){
            console.log(result);
            document.location.href = "index.html#collection";
        },
        error:function (xhr,textStatus,errorThrown){
            alert("Could not add Bug "+bName);
            alert(textStatus +" "+ errorThrown);
        }
    })
})
this.getElementById("submitAnswer").addEventListener("click", function() {
    let userAnswer = document.getElementById("userAnswer").value;
    let myH2 = document.getElementById("quizQuestion");
    if (userAnswer == chosenBug.bName){
        myH2.textContent = "CORRECT! THAT WAS THE RIGHT BUG!";
    } else {
        myH2.textContent = "WRONG!!! THE RIGHT BUG WAS "+chosenBug.bName+"!!!";
    }
    let myImg = document.getElementById("quizImage");
    myImg.src = chosenBug.bImage;
})

});