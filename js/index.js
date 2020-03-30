document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page loaded');
    fetchUsers();
});

const baseUrl = 'https://api.github.com';
const fetchUsers = () => {
    fetch(`${baseUrl}/search/users?q=+language:java+location:lagos&per_page=200`)
    .then((response) => response.json())
    .then((data) => {
        displayUsers(data.items);
    })
}


const displayUsers = (users) => {
    const contentSection = document.querySelector('.content .users');
    const spinner = document.querySelector('.loader-container');

    for (user of users) {
        var itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        var userImageElement = document.createElement('img');
        userImageElement.src = user.avatar_url;
        userImageElement.setAttribute('alt', 'user-image');
        userImageElement.className = 'user-image';

        var usernameElement = document.createElement('p');
        usernameElement.innerHTML = user.login;
        usernameElement.className = "username"

        itemDiv.appendChild(userImageElement);
        itemDiv.appendChild(usernameElement);
        itemDiv.dataset.username = user.login;

        itemDiv.addEventListener('click', userClickEventListener);

        contentSection.appendChild(itemDiv);

        if (user.login == users[users.length - 1].login) {
            spinner.parentNode.removeChild(spinner);
        }
    }
}

const userClickEventListener = (event) => {
    const userElement = event.target;
    const username = userElement.dataset.username;

    if (username != null) {
        window.location.href = `./profile.html?username=${username}`;
    }
}
