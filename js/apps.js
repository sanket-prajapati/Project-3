console.log('Welcome to app.js');
shownotes();
/*jevu apane page open kari ae tyare alagi add kareli note dekhavi joi ae aetle function shownotes() ne call karyu*/

//if user add note, add to it localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    //let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    //notesObj.push(addTxt.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    shownotes();
})

//function to show element from localStorage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="notecard my-2 mx-2 card" style="width: 18rem;" >
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML=`Nothing to show! please use above add note button to add note.`;
    }
}

//Function to Delete Note
function deleteNote(index){
    console.log("I am deleting",index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();

}

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
    //console.log("Input Event Fired");
    let inputval=search.value;
    //console.log("Input Event fired",inputval);
    let notecards=document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText; /*p tag, ae element 6e aetle document ni jagya ae element no use karel 6e*/ 
        if(cardTxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 