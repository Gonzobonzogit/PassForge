//Blacklisted passwords
const blackList = ['password', '1234567', 'test', 'newpassword', 'password123', 'password1234', 'password12345', 'newpassword123' ];

const passInput = document.getElementById('input-Pass');
const strengthLevel = document.querySelector('.meter-fill');

   //Fill the strength bar
    const scoreStrength = (score) => {
        //translation
        if(score >= 5){
            score = 3;
        } else if(score >= 3){
            score = 2;
        } else if(score >= 1){
            score = 1;
        } else{
            score = 0;
        }

        const level = {

            0: { width: '0%', color: 'transparent' },
            1: { width: '25%', color: 'var(--accent-red)' }, //weak
            2: { width: '50%', color: 'var(--accent-gold)' }, //moderate
            3: { width: '100%', color: 'var(--accent-green)' } //strong
        };

        const { width, color } = level[score] || level[0];

        const bar = document.getElementById('strength-meter');

        bar.style.width = width;
        bar.style.backgroundColor = color;
    };



const passwdCheck = (passwd) => {
    //Password rules
   const passwdRules = {
        length: { regex: null, min: 10, label: 'Password needs a min of 10 characters' },
        lower: { regex: /[a-z]/, label: 'Password must contain at least 1 lowercase letter' },
        upper: { regex: /[A-Z]/, label: 'Password must contain at least 1 uppercase letter' },
        number: { regex: /[0-9]/, label: 'Password must contain at least 1 number' },
        specialChar: { regex: /[~!@#$%^&*_+\\=/|<>?/.,;:]/, label: 'Password must contain at least one special character' },
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
    results.forbidden = blackList.includes(passwd.toLowerCase()) || /\s/.test(passwd);
    if(results.forbidden){
        console.log('Forbidden phrase used, enter a different password!!');
    }

    //Assign the strength rating for the password
    let strength = '';
    if(rulesPassed === 5 && !results.forbidden){
        strength = 'Strong';
    } else if(rulesPassed < 5 && rulesPassed >= 4){
        strength = 'Moderate';
    } else if(rulesPassed <= 4 && rulesPassed >= 1){
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

window.passwdCheck = passwdCheck;
window.scoreStrength = scoreStrength;
