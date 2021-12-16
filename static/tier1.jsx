"user_strict"

document.querySelector("#search_now").addEventListener('click', evt => {
    if (document.querySelector('[name="location"]').value =='') {
        evt.preventDefault();
    }
    evt.preventDefault();
    const payload = {'radius' : '40000', 'categories' : 'restaurant', 'limit' : '50'};
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

    // const querystr = new URLSearchParams(payload).toString(); 
    // const url = `/results-top?${querystr}`;

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







function DisplayFood(responseJson) {
const [yesCount, setyesCount] = React.useState(0);
const [noCount, setnoCount] = React.useState(0);
const tier1Count = yesCount + noCount;
let distance = ((responseJson['response']["businesses"][tier1Count]['distance'])/1609);
let dist1 = (distance).toFixed(2);

const [tier2, settier2] = React.useState({});
const [yesCount2, setyesCount2] = React.useState(0);
const [noCount2, setnoCount2] = React.useState(0);
const tier2Count = yesCount2 + noCount2;
// let distance2 = ((tier2[yesCount2]['distance'])/1609);
// let dist2 = (distance2).toFixed(2);

const [tier3, settier3] = React.useState({});
const [yesCount3, setyesCount3] = React.useState(0);
const [noCount3, setnoCount3] = React.useState(0);
const tier3Count = yesCount3 + noCount3;
// let distance3 = ((tier3[yesCount3]['distance'])/1609);
// let dist3 = (distance3).toFixed(2);

const [tier4, settier4] = React.useState({});
const [yesCount4, setyesCount4] = React.useState(0);
const [noCount4, setnoCount4] = React.useState(0);
const tier4Count = yesCount4 + noCount4;
// let distance4 = ((tier4[yesCount4]['distance'])/1609);
// let dist4 = (distance4).toFixed(2);

const [Final, setFinal] = React.useState({});

let currentTier = 1;

const wrapClickYes = () => {
    setyesCount(yesCount => yesCount + 1);
    tier2[yesCount] = (responseJson['response']["businesses"][tier1Count]);
    settier2(tier2);
    }
const wrapClickYes2 = () => {
    setyesCount2(yesCount2 => yesCount2 + 1);
    tier3[yesCount2] = (tier2[yesCount2]);
    settier3(tier3);
    }
const wrapClickYes3 = () => {
    setyesCount3(yesCount3 => yesCount3 + 1);
    tier4[yesCount3] = (tier3[yesCount3])
    settier4(tier4);
    }
const wrapClickYes4 = () => {
    setyesCount4(yesCount4 => yesCount4 + 1);
    Final[yesCount4] = (tier4[yesCount4]);
    setFinal(Final);
    }


    


    if (yesCount > 14 | tier1Count > 28){
        if (tier2[0] !== undefined) {
            console.log((Object.keys(tier2).length)-1);
            console.log(tier2);
            currentTier += 1
        } else {
            console.log('empty')
            window.location.href='/criteria'
            flash('')
        }}

    if (yesCount2 > 7 | tier2Count > 13) {
        currentTier += 1
    }
    if (yesCount3 > 3 | tier3Count > 6) {
        currentTier += 1
    }
    if (tier4Count > 2) {
        currentTier += 1
    }
    if (yesCount4 == 1) {
        currentTier = 5
    }




    if (currentTier == 1) {
        return (
            <React.Fragment>
                
            <div>
                <h1>{responseJson['response']["businesses"][tier1Count]['name']}</h1>
                
                <p>
                    {responseJson['response']["businesses"][tier1Count]['location']['address1'] }<br></br>
                    {responseJson['response']["businesses"][tier1Count]['location']['city'] }<br></br>
                <br></br>
                    {dist1} miles away<br></br>
                </p>
                <img src={responseJson['response']["businesses"][tier1Count]['image_url']}></img>
            </div>
            
            <button type="button" onClick={wrapClickYes}> 
                    Sounds Great! </button>
            <button type="button" onClick={() => setnoCount(noCount + 1)}> 
                    Not in the Mood </button>
            </React.Fragment>
        );}

    if (currentTier == 2) {
        return (
            <React.Fragment>
                ROUND TWO
                <div>
                <h1>{tier2[tier2Count]['name']}</h1>
                
                <p>
                    {tier2[tier2Count]['location']['address1'] }<br></br>
                    {tier2[tier2Count]['location']['city'] }<br></br>
                <br></br>
                    {/* {dist2} miles away<br></br> */}
                </p>
                <img src={tier2[tier2Count]['image_url']}></img>
            </div>
            
            <button type="button" onClick={wrapClickYes2}> 
                    Sounds Great! </button>
            <button type="button" onClick={() => setnoCount2(noCount2 + 1)}> 
                    Not in the Mood </button>
            </React.Fragment>
        );  
    }
    if (currentTier == 3) {
        return (
            <React.Fragment>
                ROUND THREE
                <div>
                <h1>{tier3[tier3Count]['name']}</h1>
                
                <p>
                    {tier3[tier3Count]['location']['address1'] }<br></br>
                    {tier3[tier3Count]['location']['city'] }<br></br>
                <br></br>
                    {/* {dist3} miles away<br></br> */}
                </p>
                <img src={tier3[tier3Count]['image_url']}></img>
            </div>
            
            <button type="button" onClick={wrapClickYes3}> 
                    Sounds Great! </button>
            <button type="button" onClick={() => setnoCount3(noCount3 + 1)}> 
                    Not in the Mood </button>
            </React.Fragment>
        );  
    }
    if (currentTier == 4) {
        return (
            <React.Fragment>
                FINAL ROUND
                <div>
                <h1>{tier4[tier4Count]['name']}</h1>
                
                <p>
                    {tier4[tier4Count]['location']['address1'] }<br></br>
                    {tier4[tier4Count]['location']['city'] }<br></br>
                <br></br>
                    {/* {dist4} miles away<br></br> */}
                </p>
                <img src={tier4[tier4Count]['image_url']}></img>
            </div>
            
            <button type="button" onClick={wrapClickYes4}> 
                    Sounds Great! </button>
            <button type="button" onClick={() => setnoCount4(noCount4 + 1)}> 
                    Not in the Mood </button>
            </React.Fragment>
        );  
    }
    if (currentTier == 5) {
        return (
            <React.Fragment>
            <div>
                <h2>You'll be dining at:</h2>
                <h1>{tier4['0']['name']}</h1>
                <img src={Final['0']['image_url']}></img>
            </div>
            
            <button type="button" onClick={location.href=`${Final['0']['url']}`}> 
                    See Restraunt Details </button>
            <button type="button" onClick={location.href=`${'/criteria'}`}> 
                    Eh, I'm not really feeling it.. Start a new Search </button>
            </React.Fragment>
        );  
    }      
}



