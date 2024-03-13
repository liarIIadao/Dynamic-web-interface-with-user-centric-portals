const myModal = new bootstrap.Modal('#exampleModal');

let infoCards = document.getElementById(`infoCards`);
let ul = document.getElementById(`userList`);

let isAuserRemoved = false;


//NEED to update src of img tag if a user is removed
const remove_user = (userid) => {
    infoCollection = infoCollection.filter((listUser) => listUser.UserName !== userid)
    for (let i = 0; i < infoCollection.length; i++) {
        document.getElementById(`card${i}`).style.display = `block`;
    }
    for (let i = infoCollection.length; i < 15; i++) {
        document.getElementById(`card${i}`).style.display = `none`;
    }
}


const list_update = ()=> {
    ul.innerHTML = ``;
    for (let i = 0; i <infoCollection.length; i++) {
        if(!infoCollection[i].isAdmin){
            let userInList = ul.appendChild(document.createElement(`li`)).appendChild(document.createElement(`a`));
            userInList.setAttribute(`class`, `dropdown-item`);
            let userNameInList = document.createTextNode(infoCollection[i].UserName);
            userInList.addEventListener(`click`, ()=> {
                remove_user(infoCollection[i].UserName);
                populateCards();
                isAuserRemoved = true
            } )
            userInList.appendChild(userNameInList);
        }
    }
    //isAuserRemoved = false;
}

document.getElementById(`delete_user`).addEventListener(`click`, list_update);

// hide element if there's no info
const hideUnusedCards = () => {for (let i = 0; i < 15; i++) {
    let card = document.getElementById(`card${i}`).firstElementChild.firstElementChild;
    if (card.getAttribute(`src`)=== ``){
        document.getElementById(`card${i}`).style.display = `none`;
    }
}}


const updateCards= () => {
    populateCards();
    hideUnusedCards();

}
// Build cards for admins
const populateCards = () => {
    for (let i = 0; i < infoCollection.length; i++) {
        document.getElementById(`VI${i}`).setAttribute(`src`, infoCollection[i].VisualId)
        document.getElementById(`PN${i}`).innerHTML = infoCollection[i].PersonalName;
        document.getElementById(`FN${i}`).innerHTML = infoCollection[i].FamilyName;
        document.getElementById(`Email${i}`).innerHTML = infoCollection[i].Email;
        document.getElementById(`User${i}`).innerHTML = infoCollection[i].UserName;
        document.getElementById(`card${i}`).style.display = `block`;
    }
}

// Sign out button functionality: reset form, show login, hide sign out, hide infoCards
document.getElementById(`logout`).addEventListener(`click`, (event) => {
    event.preventDefault();
    document.getElementById(`myForm`).reset();
    document.getElementById(`openModal`).style.display = `flex`;
    document.getElementById(`logout`).style.display = `none`;
    document.getElementById(`editBtn`).style.display= `none`;
    infoCards.style.display = `none`;
})

// Validate userInput via login button,
document.getElementById(`login`).addEventListener(`click`, (event) => {
    event.preventDefault();
    let adminLogin = false;
    let userLogin = false;
    let userIndex = -1;
    let inputUser = document.getElementById(`input0`).value.toUpperCase();
    let inputEmail = document.getElementById(`input1`).value;

    try {
        for (let i = 0; i < 15; i++) {
            if ((inputUser === infoCollection[i].UserName) && (inputEmail === infoCollection[i].Email) && (i < 3)) {
                adminLogin = true;
                userLogin = false;
                document.getElementById(`error1`).innerHTML = ``;
                //let currentTime = new Date.now();
                //document.getElementById(`log`).textContent = `Login timestamp: ${currentTime.toString()}`
                document.getElementById(`logout`).style.display = `flex`;
                document.getElementById(`openModal`).style.display = `none`;
                console.log(`verified`)
            }
            else if ((inputUser === infoCollection[i].UserName) && (inputEmail === infoCollection[i].Email) && (i <= 15)){
                userLogin = true;
                adminLogin = false;
                userIndex = i;
                document.getElementById(`error1`).innerHTML = ``;
                document.getElementById(`logout`).style.display = `flex`;
                document.getElementById(`openModal`).style.display = `none`;
                console.log(`userverified`)
            }
        }
        if(!(userLogin || adminLogin)) {
            console.log(`notverified`)
            throw new Error(`Input user or email is not valid`);
        }
    } catch(e) {
            console.log(`error!`)
            document.getElementById(`error1`).innerHTML = (e);

    }
    finally {
        if (adminLogin){
            populateCards();
            infoCards.style.display = `block`;
            document.getElementById(`editBtn`).style.display= `flex`;
            myModal.hide();
        }
        else if (userLogin){
            document.getElementById(`PN0`).innerHTML = infoCollection[userIndex].PersonalName;
            document.getElementById(`FN0`).innerHTML = infoCollection[userIndex].FamilyName;
            document.getElementById(`Email0`).innerHTML = infoCollection[userIndex].Email;
            document.getElementById(`User0`).innerHTML = infoCollection[userIndex].UserName;

            for (let i = 1; i < 4; i++) {
                document.getElementById(`PN${i}`).innerHTML = infoCollection[i-1].PersonalName;
                document.getElementById(`FN${i}`).innerHTML = infoCollection[i-1].FamilyName;
                document.getElementById(`Email${i}`).innerHTML = infoCollection[i-1].Email;
                document.getElementById(`User${i}`).innerHTML = infoCollection[i-1].UserName;
            }
            infoCards.style.display = `block`;
            myModal.hide();
        }
        else {
            infoCards.style.display = `none`;
        }

    }
})

// times stamp of login

class User {
    constructor(personalName, familyName, email, role, userId, visualId){
        this.PersonalName = personalName;
        this.FamilyName = familyName;
        this.Email = email;
        this.isAdmin = role;
        this.UserName = userId;
        this.VisualId = visualId;
    }
}


let infoCollection =
    [
        new User(`Matthew`, `Shi`, `adaojun99@gmail.ca`, true,`USER1`, `null`),
        new User(`admin`, `admin`, `admin`, true,`USER2`, `null`),
        new User(`Joe`, `Negan`, `3@3.ca`, true, `USER3`,`nulk`),
        new User(`Elon`, `Musk`, `4@4.ca`, false, `USER4`,`nulk`),
        new User(`Tony`, `Stark`, `5@5.ca`,  false, `USER5`,`profilepics/user4.webp`),
        new User(`Barack`, `Obama`, `6@6.ca`, false, `USER6`,`nulk`),
        new User(`Margot`, `Robbie`, `7@7.ca`, false, `USER7`,`nul`),
        new User(`Saul`, `Goodman`, `8@8.ca`, false, `USER8`,`nulk`),
        new User(`Kim`, `Wexler`, `9@9.ca`, false, `USER9`,`null`),
        new User(`Rick`, `Grimes`, `10@10.ca`, false, `USER10`,`null`),
        new User(`Morty`, `Grimes`, `11@11.ca`, false, `USER11`,`null`),
        new User(`Evil`, `Morty`, `12@12.ca`, false, `USER12`,`null`),
        new User(`Summer`, `Grimes`, `13@13.ca`, false, `USER13`,`nul`),
        new User(`Rust`, `Cohle`, `14@14.ca`, false, `USER14`,`nulk`),
        new User(`Marty`, `Hart`, `15@15.ca`, false, `USER15`,`nulk`)
    ];


let adminList = [`User1`, `User2`, `User3`];
let newList = infoCollection.filter((word) => adminList.includes(word.UserName)).map(user => user.PersonalName);
