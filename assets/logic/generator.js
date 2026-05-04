
//The Chaos Engine
const enhancePasswd = (length = 14) => {
  const fullPool = {
      lower : 'abcdefghijklmnopqrstuvwxyz',
      upper : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers : '0123456789',
      special : '~!@#$%^&*_+\\=/|<>?/.,;:'
  };

    const allChars = Object.values(fullPool).join('');
    let passwdArry = [];

    //To guarentee passwd meet the 'Strong' definition
    passwdArry.push(fullPool.lower[Math.floor(Math.random() * fullPool.lower.length)]);
    passwdArry.push(fullPool.upper[Math.floor(Math.random() * fullPool.upper.length)]);
    passwdArry.push(fullPool.numbers[Math.floor(Math.random() * fullPool.numbers.length)]);
    passwdArry.push(fullPool.special[Math.floor(Math.random() * fullPool.special.length)]);

    //Loop thru
    for(let i = passwdArry.length; i < length; i++){
        const randomIndex = Math.floor(Math.random() * allChars.length);
        const randomVal = allChars[randomIndex];
        passwdArry.push(randomVal);
    }

    //Shuffle the deck (Fisher-Yates Algorithm)
    for(let i = passwdArry.length - 1; i > 0; i--){
        const c = Math.floor(Math.random() * (i + 1));
        [passwdArry[i], passwdArry[c]] = [passwdArry[c], passwdArry[i]];
    }

    return passwdArry.join('');
}

window.enhancePasswd = enhancePasswd;
