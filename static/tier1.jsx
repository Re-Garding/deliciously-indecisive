"user_strict"

const QUERY_NUM = 30;

document.querySelector("#search_now").addEventListener('click', evt => {
    // if (document.querySelector('[name="location"]').value =='') {
    //     evt.preventDefault();
    //     window.location.href='/criteria'        
    // }
    evt.preventDefault();
    const payload = {'radius' : '40000', 'categories' : 'restaurant', 'limit' : `${QUERY_NUM}`};
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


const [yesCount, setyesCount] = React.useState(0);
const [noCount, setnoCount] = React.useState(0);
const [likes, setlikes] = React.useState(QUERY_NUM - 1);
let [round, setround] = React.useState(1);
const tier1Count = yesCount + noCount;

const [tier, settier] = React.useState(responseJson['response']['businesses']); 
let distance = ((tier[tier1Count]['distance'])/1609);
let dist1 = (distance).toFixed(2);


const wrapClickYes = () => {
    // console.log(likes);
    setyesCount(yesCount => yesCount + 1);
    tier[yesCount] = tier[tier1Count];
    
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

    fetch('/add-rating', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }
        ).then(response => response.json()) .then(responseData => {
         responseData
    });
    document.querySelector('#rate').innerHTML = "Successfully Rated";
        
}



let session = "";
if (document.querySelector('#session') == undefined) {
    session = '';
} else {session = (
    <div id="rate">
        <h3>Have you been here before? Would you like to rate it?</h3>
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
        </form>
    </div>
);}

if ((Object.keys(tier).length === 1 && tier['0'] === undefined)) {  
    return (
        <React.Fragment>
        <div>
            <h2>You'll be dining at:</h2>
            <h1>{tier[likes]['name']}</h1>
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
                <h2>Option {tier1Count + 1} of {likes+1}</h2>
                <h1>{tier[tier1Count]['name']}</h1>
                
                <p>
                    {tier[tier1Count]['location']['address1'] }<br></br>
                    {tier[tier1Count]['location']['city'] }<br></br>
                <br></br>
                    {dist1} miles away<br></br>
                </p>
                <img src={tier[tier1Count]['image_url']} height="350"></img>
            </div>
            
            <button type="button" onClick={wrapClickYes}> 
                    Sounds Great! </button>
            <button type="button" onClick={wrapClickNo}> 
                    Not in the Mood </button>
            
            {session}
            </React.Fragment>);
};
}




