"user_strict"


const QUERY_NUM = 30;

document.querySelector("#search_now").addEventListener('click', evt => {
    if (document.querySelector('[name="location"]').value == '' && document.querySelector('#session') == null) {
        evt.preventDefault();
        window.location.href='/criteria'
        }
    evt.preventDefault();
    const payload = {'radius' : '40000', 'categories' : 'restaurant', 'limit' : `${QUERY_NUM}`};
    const search = document.querySelector('[name="search"]').value;
    const location = document.querySelector('[name="location"]').value;
    const sort = document.querySelector('[name="sort_by"]').value;
    const allPrice = [];
    const open = document.querySelector('[name="open"]').value;
    const rating = [];
    const cats = document.querySelector('#cats').value;

    if (document.querySelector('[name="$"]').checked) {
        allPrice.push('1')
    }
    if (document.querySelector('[name="$$"]').checked) {
        allPrice.push('2')
    }
    if (document.querySelector('[name="$$$"]').checked) {
        allPrice.push('3')
    }
    if (document.querySelector('[name="$$$$"]').checked) {
        allPrice.push('4')
    }

    if (document.querySelector('[name="1"]').checked) {
        rating.push('1')}
    if (document.querySelector('[name="1.5"]').checked) {
        rating.push('1.5')}
    if (document.querySelector('[name="2"]').checked) {
        rating.push('2')}
    if (document.querySelector('[name="2.5"]').checked) {
        rating.push('2.5')}
    if (document.querySelector('[name="3"]').checked) {
        rating.push('3')}
    if (document.querySelector('[name="3.5"]').checked) {
        rating.push('3.5')}
    if (document.querySelector('[name="4"]').checked) {
        rating.push('4')}
    if (document.querySelector('[name="4.5"]').checked) {
        rating.push('4.5')}
    if (document.querySelector('[name="5"]').checked) {
        rating.push('5')}   



    if (open == 'True') {
        payload.open_now = "True";
    }
    if (open == 'False') {
        payload.open_now = "False";
    }
    if (search !== '') {
        payload.term = search;
    }
    if (location !== '') {
        payload.location = location;
    }
    if (sort !== '') {
        payload.sort_by = sort;
    }
    if (allPrice !== '') {
        payload.price = allPrice;
    }
    if (document.querySelector('#session') !== null) {
        const database = document.querySelector('#database').checked;
        payload.database = database;}

    payload.rating = rating;
    payload.cats = cats;

    
    

// fetch Json Yelp data from the backend - returns Json
    fetch('/results-top', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        }
    }
        ).then(response => response.json()) .then(responseJson => {
        
            document.querySelector('#base').innerHTML = "";
        
            ReactDOM.render(<div><DisplayFood response={responseJson} /></div>, document.querySelector('#base'));
        });
        
});


// Object.keys(object).length
// how to determine # of items in Object



function DisplayFood(responseJson) {

console.log(responseJson);
const totalResponses = Object.keys(responseJson['response']['businesses']).length

if (totalResponses == 0) {
    return (
        <React.Fragment>
        <div>
            <h2>Your Search Returned Zero Results</h2>
        </div>
        <div>
        <img src={'static/Imgs/spag.jpg'} height="350"></img>
        </div>
        <button type="button" onClick={ () => location.href=`${'/criteria'}`}> 
                Start a New Search </button>
        </React.Fragment>
    );
}
// total items returned from data pull
console.log(responseJson);

const [yesCount, setyesCount] = React.useState(0);
const [noCount, setnoCount] = React.useState(0);
const [likes, setlikes] = React.useState(totalResponses - 1);
let [round, setround] = React.useState(1);
const tier1Count = yesCount + noCount;

const [tier, settier] = React.useState(responseJson['response']['businesses']); 
let distance = ((tier[tier1Count]['distance'])/1609);
let dist1 = (distance).toFixed(2);


const wrapClickYes = () => {
    // console.log(likes);
    setyesCount(yesCount => yesCount + 1);
    tier[yesCount] = tier[tier1Count];
    document.querySelector('#response').innerHTML = "";

    
    if (yesCount != tier1Count) 
    {delete tier[tier1Count];
    }
    // console.log(tier);
    // console.log(tier1Count);
    if (tier1Count == likes) {
        setToZero();
        // console.log('set to zero');
    }
}
const wrapClickNo = () => {
    setnoCount(noCount => noCount + 1);
    delete tier[tier1Count];
    document.querySelector('#response').innerHTML = "";
    // console.log(tier);
    // console.log(tier1Count);

    // console.log(Object.keys(tier).length);
    if (tier1Count == likes) {
        setToZero();
        // console.log('set to zero');
    }


}

const setToZero = () => {
    setlikes(likes => Object.keys(tier).length-1);
    setyesCount(yesCount => yesCount - yesCount);
    setnoCount(noCount => noCount - noCount);
    setround(round => round + 1);
}





const postReview = (evt) => {
    evt.preventDefault();
    const data = tier[tier1Count];
    const rate = document.querySelector('[name="rate"]').value;
    data['rating'] = rate;
    data['categories'] = data['categories']


    fetch('/add-rating', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }
        ).then(response => response.text()) .then(responseText => {
            const data = responseText;
            document.querySelector('#response').innerHTML = (
                
                responseText

            );
    });

        
}

const overwriteReview = (evt) => {
    evt.preventDefault();
    const data = tier[tier1Count];
    const rate = document.querySelector('[name="rate"]').value;
    data['rating'] = rate;

    fetch('/overwrite-rating', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }
        ).then(response => response.text()) .then(responseText => {
            const newData = responseText;
            console.log(responseText);
            document.querySelector('#response').innerHTML = (
                
                responseText

            );
    });
}

let session = '';

if (document.querySelector('#session') == undefined) {
    session = '';
} else {
    session = (
    <div id="rate">
        <h3>Have you been here before? Would you like to rate this restaurant?</h3>
            <form>
                <select name='rate'>
                    <option value="1">1 Star</option>
                    <option value="1.5">1.5 Star</option>
                    <option value="2">2 Star</option>
                    <option value="2.5">2.5 Star</option>
                    <option value="3">3 Star</option>
                    <option value="3.5">3.5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="4.5">4.5 Star</option>
                    <option value="5">5 Star</option>
                </select>
            <button type="submit" onClick={postReview}>Leave Rating</button>
            <button type="submit" onClick={overwriteReview}>Overwrite Review</button>
        </form>
    </div>
);}

let review = ""

if (responseJson['response']['database'] == 'yes') {
    review = "Your Review"
} else {
    review = "Yelp Reviews"
}

let advice = "";

if (round == 1) {
    advice = "Say yes to everything that looks good"
}
else if (round == 2) {
    advice = "Time to be a little more selective"
}
else if (round == 3) {
    advice = "Time to be really choosy"
}
else if (round == 4) {
    advice = "Time to weed out the duds"
}
else if (round == 5) {
    advice = "Time to be completely picky"
}

// logic to determine page render below

if ((Object.keys(tier).length === 1 && tier['0'] === undefined)) {  
    return (
        <React.Fragment>
        <div>
            <h2>You'll be dining at:</h2>
            <h1>{tier[likes]['name']}</h1>
            <img src={`static/Imgs/${tier[likes]['rating']}.png`}></img>
            {tier[likes]['review_count']} {review}<br></br>
            <img src={tier[likes]['image_url']} height="350"></img>
        </div>
        
        <button type="button" onClick={ () => location.href=`${tier[likes]['url']}`}> 
                See Restraunt Details </button>
        <button type="button" onClick={ () => location.href=`${'/criteria'}`}> 
                Eh, I'm not feeling it.. Start a new Search </button>
        </React.Fragment>
    );  

} else if (Object.keys(tier).length === 1 && tier['0'] !== undefined) {
    return (
        <React.Fragment>
        <div>
            <h2>You'll be dining at:</h2>
            <h1>{tier['0']['name']}</h1>
            <p>
                {tier['0']['location']['address1'] }<br></br>
                {tier['0']['location']['city'] }<br></br>
            <br></br>
                <br></br>
                </p>
            <img src={`static/Imgs/${tier['0']['rating']}.png`}></img>
            {tier['0']['review_count']} {review}
            <img src={tier['0']['image_url']} height="350"></img>
        </div>
        
        <button type="button" onClick={ () => location.href=`${tier['0']['url']}`}> 
                See Restraunt Details </button>
        <button type="button" onClick={ () => location.href=`${'/criteria'}`}> 
                Eh, I'm not feeling it.. Start a new Search </button>
        </React.Fragment>
    ); 
} 
    else {
        return (
            <React.Fragment>
                
            <div>
                <h1> Round {round}</h1>

                    <h3>
                        ~ {advice} ~
                    </h3>
                    <h2>
                        Option {tier1Count + 1} of {likes+1}
                    </h2>
                    <h1>
                        {tier[tier1Count]['name']}
                    </h1>
                    <img src={`static/Imgs/${tier[tier1Count]['rating']}.png`}></img>
                        <br></br>
                    {tier[tier1Count]['review_count']} {review}
                
                <p>
                    {tier[tier1Count]['location']['address1'] }<br></br>
                    {tier[tier1Count]['location']['city'] }<br></br>
                    <br></br>
                    {dist1} miles away from {tier[tier1Count]['search_location']}<br></br>
                </p> 
                <a href={tier[tier1Count]['url']} target="_blank">
                    <img src={tier[tier1Count]['image_url']} height="350"></img>
                </a>
            </div>
            
            <button type="button" onClick={wrapClickYes}> 
                    Sounds Great! </button>
            <button type="button" onClick={wrapClickNo}> 
                    Not in the Mood </button>
            
            {session}
            </React.Fragment>);
};
}




