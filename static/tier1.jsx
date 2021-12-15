"user_strict"

document.querySelector("#search_now").addEventListener('click', evt => {
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
const totalCount = yesCount + noCount;
let distance = ((responseJson['response']["businesses"][totalCount]['distance'])/1609);
let dist = (distance).toFixed(2);
const [tier2, settier2] = React.useState({});
const tier3 = {}
const tier4 = {}
const [yesCount2, setyesCount2] = React.useState(0);
let currentTier = 0;


const wrapClickYes = () => {
    setyesCount(yesCount => yesCount + 1);
    tier2[yesCount] = (responseJson['response']["businesses"][totalCount]);
    settier2(tier2);
    }
// const wrapClickYes2 = () => {
//     setyesCount2(yesCount2 => yesCount2 + 1);
//     tier3[yesCount2] = (responseJson['response']["businesses"][totalCount])
//     }

    // if (yesCount > 14 | totalCount > 29){
    //     currentTier += 1
    // }
    // if (yesCount2 > 7) {
    //     currentTier += 1
    // }





    if (currentTier == 0) {
        return (
            <React.Fragment>
                
            <div>
                <h1>{responseJson['response']["businesses"][totalCount]['name']}</h1>
                
                <p>
                    {responseJson['response']["businesses"][totalCount]['location']['address1'] }<br></br>
                    {responseJson['response']["businesses"][totalCount]['location']['city'] }<br></br>
                <br></br>
                    {dist} miles away<br></br>
                </p>
                <img src={responseJson['response']["businesses"][totalCount]['image_url']}></img>
            </div>
            
            <button type="button" onClick={wrapClickYes}> 
                    Sounds Great! </button>
            <button type="button" onClick={() => setnoCount(noCount + 1)}> 
                    Not in the Mood </button>
            </React.Fragment>
        );}

    if (currentTier == 1) {
        return (
            <React.Fragment>
                ROUND TWO
                <div>
                <h1>{tier2[yesCount2]['name']}</h1>
                
                <p>
                    {tier2[yesCount2]['location']['address1'] }<br></br>
                    {tier2[yesCount2]['location']['city'] }<br></br>
                <br></br>
                    {/* {dist} miles away<br></br> */}
                </p>
                <img src={tier2[yesCount2]['image_url']}></img>
            </div>
            
            <button type="button" onClick={wrapClickYes2}> 
                    Sounds Great! </button>
            <button type="button" onClick={() => setnoCount2(noCount2 + 1)}> 
                    Not in the Mood </button>
            </React.Fragment>
        );  
    }    
}



