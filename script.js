//lets fetch all imp elements by custom attribute


const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~';

//initialise the varibles with starting values
let password = "";
let passwordLength = 10;
let checkCount =0; //one check box is marked initially
handleSlider(); //fn called

//set strength circle to grey
setIndicator("#ccc")


// functions
//copy content()
//handle slider()
//generate pass()
//set indiactor()
//getRandomInteger()
//getRandomUppercase()
//getRandomLowercase()
//getRandomNumbers()
//getRandomSymbol()
//calStrength()
    

//understand the flow of application

//it reflects pw length on UI
function handleSlider(){
    inputSlider.value = passwordLength;
    //Purpose: Updates the UI to reflect the selected password length from the slider...fotr that call the fn handleslider() line 23
    lengthDisplay.innerText = passwordLength;
    // Explanation: When you move the slider, this function sets the display to show the chosen password length.
    const min = inputSlider.min;
    const max = inputSlider.max;
    
    //when we slide slider right part should be black
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100%";

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //Purpose: Sets the strength indicator's color based on password strength.
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    //let add shadow to that indiacator bg color
}
//math.random() fn gives you random number bet the 0 to 1 but i want bet min to max ...fn gives you float value so, math.floor gives you rounded number so ..i want int atleast min so i added +min   
function getRndInteger(min, max){
     return Math.floor(Math.random()*(max-min)) + min;    
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

//ascii value of a=97 z=122 and covert it into char by using String.fromCharCode()
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

//lets create the string of all special characters and the generate random index from range and from that random index  derive the char from that string
function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    //lets assume all checkboxes are false initially
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    
    //if uppercaseCheck is checked then mark the hasUpper true
    if(uppercaseCheck.checked) hasUpper =true;
    if(lowercaseCheck.checked) hasLower =true;
    if(numbersCheck.checked) hasNum =true;
    if(symbolsCheck.checked) hasSym =true;

    //now we got the checkboxes values means if true it means checked and flase means unchecked

    if(hasUpper && hasLower && (hasNum ||hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if(
        (hasLower || hasUpper)&&
        (hasNum || hasSym) &&
        passwordLength >=6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    } 
}
//when this promise reolved/ method completed then show the copied text on screen. matlb jabtak ye resolved nhi hoga tabtak aage ki line (show copied text) execute nhi krunga... so i will apply await keyword on this method

//await only work when we write it in the async fn

async function copyContent(){
    //i want to copy on clipboard whatever text displayed 
    //may be error in this method-> so error handling..try and catch

    try{
        await navigator.clipboard.writeText(passwordDisplay.value); 
        //agar successfully copied then show copied msg text (only show when we add active class)
        copyMsg.innerText= "copied";
    }

    catch(e){
        //error
        copyMsg.innerText ="failed";
    }
    //to make copywala span visible
    copyMsg.classList.add("active");

    //after 2 second it will invisible

    setTimeout( () =>{
        copyMsg.classList.remove("active")
    },2000) ;
    
}

//shuffle password function
function shufflePassword(array){
    //fisher yates method - by this method you can shuffle the array....!
    for(let i=array.length-1; i>0; i--){
        const j= Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    //After shuffling the array, the function creates a new string (str) by concatenating each element in the shuffled array.
    array.forEach((el)=>(str +=el));
    // to iterate through the array and build the final string.
    return str;
}
//generate password(imp)
//we have to apply event listener or map the onclick event
//event listener need? where? -> on slider and on generate password button and on copy button 

  
//event listner on slider
//jab input slider pe change horaha hain, means input de rahe ho  usse jo 'value' nikal ke aayegi use hum dalnege passwordLnegth main ..wahi value ko hum copy krenge jaha display hogi wahape for that we called handleslider()
//e.target is our slider
inputSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    //When the slider is moved, it updates the passwordLength variable with the slider's current value.
    handleSlider();
})

//event listener on copy button
//jab box main value hogi,tabhi main copy kr paunga , so there must be value
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

//atleast checkbox count should be 1 to generate pass
//add addeventlistener on checkbox
//we have all checkbox in one variable i.e allCheckbox

//maine jaisehi kisi ek box pe click kiya measn 'change' kiya isse handleCheckBox Change fn run hoga aur wo count krrega check jo checked hain. 
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    })
}

if(passwordLength < checkCount){
    passwordLength = checkCount
    //when pw length changed we call handleslider() always
    handleSlider();
}

//agar 4 checkbox checked hain aur maine length ko 1 rakha toh 4 length ka pw create hoga ...measn pw length >=checkbox count


//apply eventlistener on each checkbox
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

//add event listener on gen pass btn
generateBtn.addEventListener('click',()=>{
    //none of the checkbox are selected the no pw
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //lets start the journey to find new password
    console.log("Starting the Journey");
    //first remove old password
    password = "";
    
    //lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password +=generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password +=generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password +=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password +=generateSymbol();
    // }

    //lets suppose pw length is 10 now we put 4 char now remaining we have generate
    //An array funcArr is created to hold functions that generate different types of characters based on the user's checkbox selections.
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i](); //The functions in funcArr are called one by one, and their results are concatenated to the password variable.
    }
    console.log("Compulsory addition done");

    //remaining addition
    //The remaining characters are added to meet the desired password length.
    for (let i=0; i<passwordLength - funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);

        console.log("randIndex"+ randIndex);

        password += funcArr[randIndex](); //fn called
        //his loop runs until the password reaches the specified length.
    }

    console.log("Remaining addition done");

    //but ab jo pw aayega na wo wahi order se aayega jaise humne checked kiya hain toh kya kaam ka pw ...hume chahiy random ..so we have to shuffle order of element

    //shuffle the pw
    password = shufflePassword(Array.from(password));

    console.log("shuffling addition done");


    //show this shuffles pw in UI
    passwordDisplay.value = password;

    console.log("UI addition done");


    //calculate strength
    calcStrength();

})




