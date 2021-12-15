

const button1 = document.querySelector("#search_now")

button1.addEventListener('click', evt => {
    evt.preventDefault();
    const payload = {'radius' : '40000'};
    const search = document.querySelector('[name="search"]').value;
    const location = document.querySelector('[name="location"]').value;
    const sort = document.querySelector('[name="sort_by"]').value;
    const allPrice = [];
    const open = document.querySelector('[name="open"]').value;

    if (document.querySelector('[name="$"]').value === 'on') {
        allPrice.push('1')
    }
    if (document.querySelector('[name="$$"]').value === 'on') {
        allPrice.push('2')
    }
    if (document.querySelector('[name="$$$"]').value === 'on') {
        allPrice.push('3')
    }
    if (document.querySelector('[name="$$$$"]').value === 'on') {
        allPrice.push('4')
    }

    if (open == 'True') {
        payload.open_now = "True"
    }
    if (open == 'False') {
        payload.open_now = "False"
    }
    if (search !== '') {
        payload.term = search
    }
    if (location !== '') {
        payload.location = location
    }
    if (sort !== '') {
        payload.sort_by = sort
    }
    if (allPrice !== '') {
        payload.price = allPrice
    }

    const querystr = new URLSearchParams(payload).toString(); 
    // const url = `/results-top?${querystr}`;

    fetch('/results-top', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });
        // .then(response => response.json())
        // .then(responseJson => {console.log(responseJson)});


    // window.location = "/tierone"
        
    
});

