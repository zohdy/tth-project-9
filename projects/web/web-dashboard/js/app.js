// Handle navbar bell icon and alert-items
const bellIcon = document.querySelector('.bell-icon');
const bellBadge = document.querySelector('.notifications .bell-badge');
const alertBoxItem = document.querySelector('.alert-box-item');
const alertList = document.querySelector('.alert-list');

// Dim the notification-bell style when clicked
bellIcon.addEventListener('click', () => {
    bellIcon.classList.remove('highlight');
    bellBadge.style.display = 'none';

    // Add min. 2 new alert-items (max 4)
    for(let i = 0; i < Math.floor(Math.random() * 4) + 2; i++) {
        const newAlertItem = document.createElement('LI');
        const closeBtn = document.createElement('SPAN');
        newAlertItem.textContent = alertBoxItem.childNodes[0].textContent;
        newAlertItem.classList.add('alert-box-item');
        closeBtn.innerHTML = '&times;';
        closeBtn.classList.add('close');
        newAlertItem.appendChild(closeBtn);
        alertList.appendChild(newAlertItem);
    }
});

// Close Alert Divs
alertList.addEventListener('click',(e) => {
    if(e.target.className === 'close') {
        let li = e.target.parentNode;
        li.classList.add('fade-out');
        setTimeout(() => {
            li.parentNode.removeChild(li);
        }, 1000);
    }
});

// Navbar selection styling
const ul = document.querySelector('nav ul');
ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG') {
        const isSelected = document.querySelector('nav li.selected');
        const isHiglighted = document.querySelector('nav img.highlight');

        let clickedImg = e.target;
        let targetLi = e.target.parentElement.parentElement;

        if(isSelected) {
            isSelected.classList.remove('selected');
            isHiglighted.classList.remove('highlight');
        }
        targetLi.classList.add('selected');
        clickedImg.classList.add('highlight');
    }
});


// Randomize num of SoMe followers
const numOfFollowers = document.querySelectorAll('.num-of-followers');
for(let i = 0; i < numOfFollowers.length; i++){
    let randomNum = Math.floor((Math.random() * 20000) + 500);
    // Converts to thousands as commas
    randomNum = new Intl.NumberFormat('en').format(randomNum);
    numOfFollowers[i].textContent = randomNum;
}


/*
     ****************   Start of Autocomplete Functionality  ***************
 */
const searchInputField = document.querySelector('#search-user-input');
const users = ['Patrick Peter Zohdy', 'Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];
const container = document.querySelector('.autocomplete-container');
const textArea = document.querySelector('textarea');

searchInputField.addEventListener('keyup', (e) => {
    let searchString = e.target.value;
    let result = matchPeople(searchString);
    // Dont display results if user backspaces to start
    if(result.length > 0 && searchString === ''){
        result = '';
    }
    createSearchList(result)

});

function createSearchList(result){
    // Clear list after each event is fired
    removeSearchList();

    // Create div element for each match
    for(let i = 0; i < result.length; i++){
        let searchItems = document.createElement('DIV');
        searchItems.innerHTML = result[i];
        searchItems.setAttribute('class', 'autocomplete-items');
        container.appendChild(searchItems);
    }

    // Display the selected user in the input field and clear the list
    container.addEventListener('click', (e) => {
        let chosenUser = e.target.innerHTML;
        if(e.target.className === 'autocomplete-items') {
            searchInputField.value = chosenUser;
        }
        removeSearchList();
    });
}

function removeSearchList() {
    /* Clear the searchlist except the input field and the container */
    while(container.childNodes.length > 2) {
        container.removeChild(container.lastChild);
    }
}

// From 'https://stackoverflow.com/a/28321100/10270166'
function matchPeople(searchInput) {
    let reg = new RegExp(searchInput.split('').join('\\w*').replace(/\W/, ""), 'i');
    return users.filter((user) => {
        if (user.match(reg)) {
            return user;
        }
    });
}
/*
     ****************   End of Autocomplete Functionality  ***************
 */

// Modal notifications
const modal = document.querySelector('.modal');
const sendBtn = document.querySelector(".message button");
const modalContent = document.querySelector('.modal-content p');

sendBtn.addEventListener('click',() => {
    if(textArea.value === '' || searchInputField.value === '') {
        setModal('Invalid input, message not sent!', '#b2b2b2');
    } else {
        setModal('Message sent successfully!', '#81c98f');
    }
});

function setModal(text, color) {
    modal.classList.remove('fade-out');

    modalContent.textContent = text;
    modalContent.style.background = color;
    modal.style.display = 'block';

    // Todo - disable send button while modal is displayed
    setTimeout(() => {
        modal.classList.add('fade-out');
    }, 3000);
}

// Save settings to local storage
const saveBtn = document.querySelector('.save-btn');
const timeZoneSelectBox = document.querySelector('.timezone-select');
const emailCheckBox = document.querySelector('#email-switch');
const publicProfileCheckbox = document.querySelector('#public-profile-switch');

let dropdownSelection = localStorage.getItem('dropdown');
// Needs JSON parsing because of the 'checked' boolean return type
let emailSetting = JSON.parse(localStorage.getItem('email-setting'));
let publicSetting = JSON.parse(localStorage.getItem('public-profile'));

// If just one of the settings items is changed
if(dropdownSelection || emailSetting || publicSetting){
    timeZoneSelectBox.value = dropdownSelection;
    publicProfileCheckbox.checked = publicSetting;
    emailCheckBox.checked = emailSetting;
}

saveBtn.addEventListener('click', () => {
    // Save dropdown selection
    dropdownSelection = timeZoneSelectBox.options[timeZoneSelectBox.selectedIndex].value;
    localStorage.setItem('dropdown', dropdownSelection);
    // Save checkbox items
    localStorage.setItem('email-setting', emailCheckBox.checked);
    localStorage.setItem('public-profile', publicProfileCheckbox.checked);

    // Confirmation modal
    setModal('Settings saved!',  '#81c98f');
});


// Prevents default reload on every form element
const forms = document.querySelectorAll('form');
for(let i = 0; i < forms.length; i++){
    forms[i].addEventListener('submit', (e) => {
        e.preventDefault();
    });
};