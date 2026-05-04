//Blacklisted passwords
const blackList = ['password', '1234567', 'test', 'newpassword', 'password123', 'password1234', 'password12345' ];

/*
 * Evaluates the password input against PassForges rules
 * @param {string} passwd - password to be checked
 * @returns {object} - the report with the rules and strength
 */

const passwdCheck = (passwd) => {
    //Password rules
   const passwdRules = {
        length: { regex: null, min: 10, label: 'Password needs a min of 10 characters' },
        lower: { regex: /[a-z]/, label: 'Password must contain at least 1 lowercase letter' },
        upper: { regex: /[A-Z]/, label: 'Password must contain at least 1 uppercase letter' },
        number: { regex: /[0-9]/, label: 'Password must contain at least 1 number' },
       specialChar: { regex: /[~!@#$%^&*_+\\=/|<>?/.,;:]/, label: 'Password must contain at least one special character' },
        forbidden: { blacklist: blackList, label: 'Password cannot be in the forbidden list' }
    };

    const results = {};
    let rulesPassed = 0;

    //check password length
    results.length = passwd.length >= passwdRules.length.min;
    if(results.length){
        rulesPassed++;
    };

    //Regex checks
    ['lower', 'upper', 'number', 'specialChar'].forEach(key => {
        results[key] = passwdRules[key].regex.test(passwd);
        if(results[key]){
            rulesPassed++;
        }
    });

    //Check for forbidden passwords
    results.forbidden = blackList.includes(passwd.toLowerCase());
    if(results.forbidden){
        console.log('Forbidden phrase used, enter a different password!!');
    }


    //Assign the strength rating for the password
    let strength = '';
    if(rulesPassed === 5 && !results.forbidden){
        strength = 'Strong';
    } else if(rulesPassed < 5 && rulesPassed >= 4){
        strength = 'Moderate';
    } else if(rulesPassed <= 4 && rulesPassed > 1){
        strength = 'Weak';
    } else if(results.forbidden){
        strength = 'FORBIDDEN';
    } else{
       strength ='Enter a valid password'
    }



    return{
        results,
        strength,
        score: rulesPassed
    };
};

window.passwordCheck = passwdCheck;
