const myModal = new bootstrap.Modal('#exampleModal');
let infoCards = document.getElementById(`infoCards`);
let ul = document.getElementById(`userList`);  // list of users for admin to delete

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
        new User(`admin`, `Shi`, `adaojun99@gmail.ca`, true,`USER1`, `includes/profilepics/user1.jpg`),
        new User(`admin2`, `admin`, `admin`, true,`USER2`, `includes/profilepics/user2.png`),
        new User(`admin3`, `joe`, `3@3.ca`, true, `USER3`,`includes/profilepics/user3.png`),
        new User(`Elon`, `Musk`, `4@4.ca`, false, `USER4`,`includes/profilepics/user4.webp`),
        new User(`Tony`, `Stark`, `5@5.ca`,  false, `USER5`,`includes/profilepics/user5.webp`),
        new User(`Barack`, `Obama`, `6@6.ca`, false, `USER6`,`includes/profilepics/user6.jpg`),
        new User(`Margot`, `Robbie`, `7@7.ca`, false, `USER7`,`includes/profilepics/user7.webp`),
        new User(`Saul`, `Goodman`, `8@8.ca`, false, `USER8`,`includes/profilepics/user8.webp`),
        new User(`Kim`, `Wexler`, `9@9.ca`, false, `USER9`,`includes/profilepics/user9.webp`),
        new User(`Rick`, `Pickle`, `10@10.ca`, false, `USER10`,`includes/profilepics/user10.webp`),
        new User(`Morty`, `Smith`, `11@11.ca`, false, `USER11`,`includes/profilepics/user11.webp`),
        new User(`Evil`, `Morty`, `12@12.ca`, false, `USER12`,`includes/profilepics/user12.webp`),
        new User(`Summer`, `Smith`, `13@13.ca`, false, `USER13`,`includes/profilepics/user13.webp`),
        new User(`Rust`, `Cohle`, `14@14.ca`, false, `USER14`,`includes/profilepics/user14.webp`),
        new User(`Marty`, `Hart`, `15@15.ca`, false, `USER15`,`includes/profilepics/user15.webp`)
    ];

// METHODS FOR OPERATIONS

// reconstruct the array of users without removed user
// show cards with info and hide cards without info
const remove_user = (userid) => {
    infoCollection = infoCollection.filter((listUser) => listUser.UserName !== userid)
    for (let i = 0; i < infoCollection.length; i++) {
        document.getElementById(`card${i}`).style.display = `block`;
    }
    for (let i = infoCollection.length; i < 15; i++) {
        document.getElementById(`card${i}`).style.display = `none`;
    }
}

// click on Deleting user button will populate list with current user in infocollection array
// give each user button a listener to remove user from array and repopulate the cards display
document.getElementById(`delete_user`).addEventListener(`click`, (event)=> {
    ul.innerHTML = ``;
    for (let i = 0; i <infoCollection.length; i++) {
        if(!infoCollection[i].isAdmin){
            let userInList = ul.appendChild(document.createElement(`li`)).appendChild(document.createElement(`a`));
            userInList.setAttribute(`class`, `dropdown-item`);
            let userNameInList = document.createTextNode(infoCollection[i].UserName);
            userInList.addEventListener(`click`, ()=> {
                remove_user(infoCollection[i].UserName);
                populateCards();
            } )
            userInList.appendChild(userNameInList);
        }
    }
});

// hide element if there's no info
const hideUnusedCards = (numVisibleCards) => {
    for (let i = 0; i < numVisibleCards; i++) {
        document.getElementById(`card${i}`).style.display = `block`;
    }
    for (let i = numVisibleCards; i < 15; i++) {
        document.getElementById(`card${i}`).style.display = `none`;
    }
}



// Build cards for admins
// make cards visible and admins card have red text
const populateCards = () => {
    for (let i = 0; i < infoCollection.length; i++) {
        document.getElementById(`VI${i}`).setAttribute(`src`, infoCollection[i].VisualId)
        document.getElementById(`PN${i}`).innerHTML = infoCollection[i].PersonalName;
        document.getElementById(`FN${i}`).innerHTML = infoCollection[i].FamilyName;
        document.getElementById(`Email${i}`).innerHTML = infoCollection[i].Email;
        document.getElementById(`User${i}`).innerHTML = infoCollection[i].UserName;
        document.getElementById(`card${i}`).style.display = `block`;
        if (infoCollection[i].isAdmin) {
            document.getElementById(`card${i}`).firstElementChild.style.color = `red`;
        }
    }
}

// Sign out button functionality: reset form, show login, hide sign out, hide infoCards, hide jump button
document.getElementById(`logout`).addEventListener(`click`, (event) => {
    event.preventDefault();
    document.getElementById(`myForm`).reset();
    document.getElementById(`openModal`).style.display = `flex`;
    document.getElementById(`logout`).style.display = `none`;
    document.getElementById(`editBtn`).style.display= `none`;
    document.getElementById(`jumpToCards`).style.display = `none`;
    infoCards.style.display = `none`;
})

// Validate userInput via sign in button,
document.getElementById(`login`).addEventListener(`click`, (event) => {
    event.preventDefault();
    let adminLogin = false;
    let userLogin = false;
    let userIndex = -1;
    let inputUser = document.getElementById(`input0`).value.toUpperCase();
    let inputEmail = document.getElementById(`input1`).value;
    try {
        // if user is deleted, trying to log in as that user failed
        if(!infoCollection.map(user=> user.UserName).includes(inputUser)){
            console.log(`usernotfound`);
            throw new Error(`User is not found`);
        }
        // admin login success:
        // make logout button appear, make openmodal button disappear
        for (let i = 0; i < 15; i++) {
            if ((inputUser === infoCollection[i].UserName) && (inputEmail === infoCollection[i].Email) && (i < 3)) {
                adminLogin = true;
                userLogin = false;
                //document.getElementById(`error1`).innerHTML = ``;
                document.getElementById(`logout`).style.display = `block`;
                document.getElementById(`openModal`).style.display = `none`;
                console.log(`verified`)
            }
        // user login success:
        // make logout button appear, make openmodal button disappear
            else if ((inputUser === infoCollection[i].UserName) && (inputEmail === infoCollection[i].Email) && (i <= 15)){
                userLogin = true;
                adminLogin = false;
                userIndex = i;
                //document.getElementById(`error1`).innerHTML = ``;
                document.getElementById(`logout`).style.display = `block`;
                document.getElementById(`openModal`).style.display = `none`;
                console.log(`userverified`)
            }
        }
        // fail to have matched username and email will lead to error
        if(!(userLogin || adminLogin)) {
            console.log(`notverified`)
            throw new Error(`Input user or email is not valid`);
        }
    } catch(e) {
            console.log(`error!`)
            document.getElementById(`error1`).innerHTML = (e);
    }
    finally {
        // for admin populate userinfo into cards and make them visible, hide the modal, clear error block
        if (adminLogin){
            populateCards();
            infoCards.style.display = `block`;
            document.getElementById(`editBtn`).style.display= `block`;
            document.getElementById(`jumpToCards`).style.display = `block`;
            myModal.hide();
            document.getElementById(`error1`).innerHTML = ``
        }
        // for users populate specific user into first card and rest three admin info into the rest
        // hide all the other unused cards and modal
        else if (userLogin){
            document.getElementById(`VI0`).setAttribute(`src`, infoCollection[userIndex].VisualId)
            document.getElementById(`PN0`).innerHTML = infoCollection[userIndex].PersonalName;
            document.getElementById(`FN0`).innerHTML = infoCollection[userIndex].FamilyName;
            document.getElementById(`Email0`).innerHTML = infoCollection[userIndex].Email;
            document.getElementById(`User0`).innerHTML = infoCollection[userIndex].UserName;
            for (let i = 1; i < 4; i++) {
                document.getElementById(`VI${i}`).setAttribute(`src`, infoCollection[i-1].VisualId)
                document.getElementById(`PN${i}`).innerHTML = infoCollection[i-1].PersonalName;
                document.getElementById(`FN${i}`).innerHTML = infoCollection[i-1].FamilyName;
                document.getElementById(`card${i}`).firstElementChild.style.color = `red`;
            }
            hideUnusedCards(4)
            infoCards.style.display = `block`;
            document.getElementById(`jumpToCards`).style.display = `block`;
            myModal.hide();
            document.getElementById(`error1`).innerHTML = ``;
        }
        // if fail to login hide the cards
        else {
            infoCards.style.display = `none`;
        }
    }
})


//let adminList = [`User1`, `User2`, `User3`];
//let newList = infoCollection.filter((word) => adminList.includes(word.UserName)).map(user => user.PersonalName);
/*
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
            } )
            userInList.appendChild(userNameInList);
        }
    }
}
*/