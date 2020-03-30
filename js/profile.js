
window.addEventListener('load', () => {
    // do stuff
    console.log('Loaded');
    console.log(window.location.pathname);
    console.log(window.location.href);
    console.log(window.location.host);
    console.log(window.location.search);

    console.log(getParamsFromCurrentUrl());
    const params = getParamsFromCurrentUrl().username;
    fetchSingleUser(params)
    
});
const baseUrl = 'https://api.github.com';

const getParamsFromUrl = (url) => {
	const params = {};
	const parser = document.createElement('a');
	parser.href = url;
	const query = parser.search.substring(1);
	const vars = query.split('&');
	for (const i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};


const getParamsFromCurrentUrl = () => {
    const params = {};
    const query = window.location.search.substring(1);
    const vars = query.split('&');

    for (const item of vars) {
        const pair = item.split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }

    return params;
}

const fetchSingleUser = username => {
    fetch(`${baseUrl}/users/${username}?client_id=694ce0aafdfbc47ad583&client_secret=58709f1741ce72e8102a05b41412b38750bf1cd0`)
    .then((response) => response.json())
    .then((data) => {
        showProfile(data);
    })
}

const showProfile = data => {
    console.log(data);
}

