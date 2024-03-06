//const myModal = new bootstrap.Modal('#exampleModal');
alert(`start`);
document.getElementById(`login`).addEventListener(`click`, (event) => {
    event.preventDefault();
    for (let i = 0; i <5; i++) {
        document.getElementById(`PN${i}`).innerHTML = infoCollection[i].PersonalName;
        document.getElementById(`FN${i}`).innerHTML = infoCollection[i].FamilyName;
        document.getElementById(`Email${i}`).innerHTML = infoCollection[i].Email;
        document.getElementById(`User${i}`).innerHTML = infoCollection[i].UserName;
    }

})

// validate userInput
document.getElementById(`logout`).addEventListener(`click`, (event) => {
    event.preventDefault();
    let inputUser = document.getElementById(`input0`).value;
    let inputEmail = document.getElementById(`input1`).value;
    let isValid = false;
    for (let i = 0; i < 4; i++) {
        if ((inputUser === infoCollection[i].UserName) && (inputEmail === infoCollection[i].Email)) {
            isValid = true;
        }
    }
    if(!isValid) {

        alert(`invalid input`)
    }

})
class User {
    constructor(PersonalName, FamilyName, Email, Role, VisualId){
        this.personalNameersonalName = PersonalName;
        this.familyName = FamilyName;
        this.email = Email;
        this.role = Role;
        this.visualId = VisualId;
    }
}



let infoCollection =
    [
        {
            PersonalName: `Matthew`,
            FamilyName: `Mingrui Shi`,
            Email: `adaojun99@gmail.com`,
            UserName: `User1`,
            Role: true, // true if user is admin
            VisualId: `null`
        },
        {
            PersonalName: `admin`,
            FamilyName: `admin`,
            Email: `admin@admin.ca`,
            UserName: `User2`,
            Role: true,
            VisualId: `null`
        },
        {
            PersonalName: `Joe`,
            FamilyName: `joe`,
            Email: `2@2.ca`,
            UserName: `User3`,
            Role: true,
            VisualId: `null`
        },
        {
            PersonalName: `IronMam`,
            FamilyName: `Tony Stark`,
            Email: `4@4.ca`,
            UserName: `User4`,
            Role: false,
            VisualId: `null`
        },
        {
            PersonalName: `Elon`,
            FamilyName: `Musk`,
            Email: `5@5.ca`,
            UserName: `User5`,
            Role: false,
            VisualId: `null`
        }
    ];

let newList = infoCollection.filter((word) => word.UserName