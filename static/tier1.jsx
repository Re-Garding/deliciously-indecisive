"user_strict"

const QUERY_NUM = 30;

document.querySelector("#search_now").addEventListener('click', evt => {
    if (document.querySelector('[name="location"]').value =='') {
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


if ((Object.keys(tier).length === 1 && tier['0'] === undefined)) {  
    return (
        <React.Fragment>
        <div>
            <h2>You'll be dining at:</h2>
            <h1>{tier[likes]['name']}</h1>
            <img src={tier[likes]['image_url']}></img>
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
            <img src={tier['0']['image_url']}></img>
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
                <h1> Round {round} - option {tier1Count + 1} of {likes+1}</h1>
                <h2>{tier[tier1Count]['name']}</h2>
                
                <p>
                    {tier[tier1Count]['location']['address1'] }<br></br>
                    {tier[tier1Count]['location']['city'] }<br></br>
                <br></br>
                    {dist1} miles away<br></br>
                </p>
                <img src={tier[tier1Count]['image_url']}></img>
            </div>
            
            <button type="button" action="/tier2" onClick={wrapClickYes}> 
                    Sounds Great! </button>
            <button type="button" action="/tier2" onClick={wrapClickNo}> 
                    Not in the Mood </button>
            </React.Fragment>);
};

          


}

// const [yesCount2, setyesCount2] = React.useState(0);
// const [noCount2, setnoCount2] = React.useState(0);
// const tier2Count = yesCount2 + noCount2;
// let distance2 = ((item[yesCount2]['distance'])/1609);
// let dist2 = (distance2).toFixed(2);
