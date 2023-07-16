const inputSlider = document.querySelector("[sliderLength]");
const lengthDisplay = document.querySelector("[passLength]");
const passDisplay = document.querySelector("[passwordDisplay]")
const copyBtn = document.querySelector("[dataCopy]");
const copingMsg = document.querySelector("[copyMsg]");
const uppercaseCheck = document.querySelector("#Uppercase");
const lowercaseCheck = document.querySelector("#Lowercase");
const numbersCheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#Symbols");
const indicator = document.querySelector("[strength-indicator]");
const generateBtn = document.querySelector(".generatebutton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols='~!@#$%^&*()-+={[]}|:;""<,>.?/';

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");

// set password length
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize= ( (passwordLength - min)*100/(max - min)) + "% 100%"

}
function setIndicator(color)
{
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
function getRandomInteger(min,max)
{
    return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomNumber()
{
    return getRandomInteger(0,9);
}
function generateLowerCase()
{
   return String.fromCharCode(getRandomInteger(97,123));
}
function generateUpperCase()
{
   return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbols()
{
   const rndNum= getRandomInteger(0,symbols.length);
   return symbols.charAt(rndNum);
}
function calcStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper =true;
    if(lowercaseCheck.checked) hasLower =true;
    if(numbersCheck.checked) hasNum =true;
    if(symbolsCheck.checked) hasSym =true;

    if(hasUpper && hasLower &&(hasNum || hasSym)&& passwordLength >=8)
    {
        setIndicator("#0f0");
    }
    else if(hasUpper && hasLower &&(hasNum || hasSym)&& passwordLength >=6)
    {
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}
function copyPass()
{
  try{
    navigator.clipboard.writeText(passDisplay.value);
    copingMsg.innerText="copied";
}
catch(e)
{
    copingMsg.innerText="failed";
}
// to make copy vala text visisble
copingMsg.classList.add("active");
// copy vala text ko 2sec baad remove kar denga
setTimeout(() => {
    copingMsg.classList.remove("active");
  }, 2000);
}
function shufflePassword(array)
//fisher yates method
{for(let i=array.length-1; i>0 ;i--)
    {
   const j = Math.floor(Math.random() * (i+1));
   const temp= array[i];
   array[i]=array[j];
   array[j]=temp;
    }
    let str="";
    array.forEach((el) => (str+=el));
    return str; 
}
function handCheckBox()
{   checkCount=0;
    allCheckBox.forEach((checkbox) =>{
      if(checkbox.checked)
      checkCount++;
    });
    // special condition
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }

}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handCheckBox);
})
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    if(passDisplay.value)
    copyPass();
})
generateBtn.addEventListener('click',()=>{
  //none of the checkbox selected
  if(checkCount<=0) return;
  if(passwordLength<checkCount)
  passwordLength=checkCount;
  handleSlider();

  //start the journey of new password
  console.log("starting the journey");
  //remove old password
  password="";
  //lets put the stuff mentioned by the checkboxes
//   if(uppercaseCheck.checked)
//   {
//     password+=generateUpperCase();
//   }
  
//   if(lowercaseCheck.checked)
//  {
//     password+=generateLowerCase();
//  }
 
//   if(numbersCheck.checked)
//   {
//     password+=generateRandomNumber();
//   }
  
//   if(symbolsCheck.checked)
//   {
//     password+=generateSymbols();
//   }

  let funcArr= [];
  if(uppercaseCheck.checked)
  funcArr.push(generateUpperCase);

  if(lowercaseCheck.checked)
  funcArr.push(generateLowerCase);

  if(numbersCheck.checked)
  funcArr.push(generateRandomNumber);

  if(symbolsCheck.checked)
  funcArr.push(generateSymbols);

  //compulsory addition
  for(let i=0; i<funcArr.length;i++)
  {
  password += funcArr[i]();
}
  console.log("compulsory addition done");

//   remaining addition
 for(let i=0;i<passwordLength-funcArr.length;i++)
 {
    let randIndex= getRandomInteger(0,funcArr.length)
    console.log("randIndex"+randIndex);
    password += funcArr[randIndex]();
 }
 console.log("remaining addition done");
 //shuffle the password
 password=shufflePassword(Array.from(password));
 console.log("shuffling done");
 //show in Ui
 passDisplay.value=password;
 console.log("Ui addition done");
 //calc strength
 calcStrength();
  
});