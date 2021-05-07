let number;
let primeNumberArray;
let circularPrimeArray;
let safeDigitsPrimeNumberArray;
let originalNumber;
let count;
const computeCircularPrime = document.querySelector('.computeCircularPrime');

computeCircularPrime.addEventListener('click', getNumberOfCircularPrimes);


function isPrime(number){
	let count = 0;
	for(let i = 0; i < number; i++){
		if(number % i === 0){
			count += 1;
		}
	}
	if(count === 1){
		return true;
	}
	else{
		return false;
	}
}


function hasBadDigits(number){
	number = number.toString();
	number = number.split('');
	badDigits = [0, 2, 4, 5, 5, 8];
	for(let i = 0; i < number.length; i++){
		number[i] = parseInt(number[i]);
		for(let j = 0; j < badDigits.length; j++){
			if(number[i] === badDigits[j]){
				return true;
			}
		}
	}

	return false;
}


function getPrimeNumbers(number){
	primeNumberArray = [];
	for(let i = 1; i < number; i++){
		if(isPrime(i)){
			primeNumberArray.push(i);
		}
	}
	return primeNumberArray;
}


function getsafeDigitsPrimeNumber(primeNumberArray){
	safeDigitsPrimeNumberArray = []
	for(let i = 0; i < primeNumberArray.length; i++){
		if(primeNumberArray[i] < 10){
			safeDigitsPrimeNumberArray.push(primeNumberArray[i]);
		}
		else{
			if(! hasBadDigits(primeNumberArray[i])){
				safeDigitsPrimeNumberArray.push(primeNumberArray[i]);
			}
		}
	}
	return safeDigitsPrimeNumberArray;
}

function flip(number){
	number = number.toString();
	number = number.split('');
	let temp = number.splice(0, 1);
	number.push(temp);
	number = number.join('');
	return parseInt(number);
}


function isCircularPrime(number){
	if(number < 13){
		return true;
	}
	else{
		number = flip(number);
		while(number !== originalNumber){
			if(isPrime(number)){
				number = flip(number);
				if(number === originalNumber){
					return true;
				}
			}
			else{
				return false;
			}
		}
	}
}


function getCircularPrimes(safeDigitsPrimeNumberArray){
	circularPrimeArray = [];
	count = 0;
	for(let i = 0; i < safeDigitsPrimeNumberArray.length; i++){
		originalNumber = safeDigitsPrimeNumberArray[i];
		number = safeDigitsPrimeNumberArray[i];
		if(isCircularPrime(number)){
			count += 1;
		}
	}
	return count;
}


function getNumberOfCircularPrimes(number){
	number = document.getElementById('numInput').value
	number = parseInt(number);
	if(typeof(number) !== 'number' || isNaN(number)){
		return document.getElementById('result').innerHTML =
		'Kindly enter a valid number';
	}
	else if(number < 100 || number > 100000){
		return document.getElementById('result').innerHTML =
		'Kindly enter a number between 100 and 100,000';
	}
	
	getPrimeNumbers(number);
	getsafeDigitsPrimeNumber(primeNumberArray);
	getCircularPrimes(safeDigitsPrimeNumberArray)

	return document.getElementById('result').innerHTML =
	`Number of Circular prime numbers below ${number} is ${count}`;
}