//Grab the checker's button ids
const inputArea = document.getElementById('input-Pass');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resetBtn = document.getElementById('reset-btn');
const toggleShowPass = document.getElementById('show-pass');

//Grab the modal element Ids
const forbidModal = document.getElementById('forbiddenModal');
const closeForbidBtn = document.getElementById('close-forbid-modal');
const enhanceModal = document.getElementById('passwd-enhancer');
const confirmEnhanceBtn = document.getElementById('enhance');
const cancelEnhanceBtn = document.getElementById('cancel-enhance');
const autoRules = document.getElementById('rulesDetails');

//The Vault - Keeps the last checked password in memory
let lastCheck = '';

const toggleModals = (modal, show) => {
    modal.style.display = show ? 'flex' : 'none';
};

const resetRuleMarkers = () => {
    document.querySelectorAll('[data-rule]').forEach(li => li.classList.remove('rule-fail', 'rule-pass'));
};

const updateRuleMarkers = (results) => {
        const rules = ['length', 'upper', 'lower', 'number', 'specialChar'];

        rules.forEach(rule => {
            const li = document.querySelector(`[data-rule="${rule}"]`);
            if(!li) return;
            li.classList.toggle('rule-fail', !results[rule]);
            li.classList.toggle('rule-pass', results[rule]);
        });
};


//Activating the check button
const performCheck = () => {
    const passwd = inputArea.value;
    if(!passwd) return;

    //Updates the vault when passwd is checkd
    lastCheck = passwd;

    const report = passwdCheck(passwd);

    if(report.results.forbidden){
        console.log('Your password is too simple and therefore it is forbidden! Please enter a new password!');
        toggleModals(forbidModal, true);
        return;
    };

//continue on to normal strength report if no forbidden password
    console.log(`Password Strength: ${report.strength}`);
    console.log(`Detailed Report:`, report.results);

    if(report.strength === 'Weak' || report.strength === 'Moderate'){
        toggleModals(enhanceModal, true);
        autoRules.open = true;
    }else{
        toggleModals(enhanceModal, false);
    }

    updateRuleMarkers(report.results);
};

checkBtn.addEventListener('click', performCheck);

//click or press enter to run check
inputArea.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter') performCheck();
});

//Lets the strength meter listen
inputArea.addEventListener('input', (event) => {
    const passwd = inputArea.value;

    if(!passwd){
        scoreStrength(0);
        resetRuleMarkers();
        return;
    };

    const report = passwdCheck(passwd);
    scoreStrength(report.score);
});



//Mask/unmask
toggleShowPass.addEventListener('change', () => {
    inputArea.type = toggleShowPass.checked ? 'text' : 'password';
});

//if enhancement is desired
confirmEnhanceBtn.addEventListener('click', () => {
    const newPass = enhancePasswd(14);
    inputArea.value = newPass;

    inputArea.type = 'text';
    toggleShowPass.checked = true;

    toggleModals(enhanceModal, false);
    console.log(`Your password has been enhanced to a strong password. Your new password is ${newPass}`);
    autoRules.open = false;
    scoreStrength(5);
    resetRuleMarkers();
});

//close and cancel buttons
closeForbidBtn.addEventListener('click', () => toggleModals(forbidModal, false));
cancelEnhanceBtn.addEventListener('click', () => toggleModals(enhanceModal, false));


//clear button
clearBtn.addEventListener('click', () => {
    inputArea.value = "";
    scoreStrength(0);
    autoRules.open = false;
    resetRuleMarkers();
    toggleShowPass.checked = false;
    toggleModals(enhanceModal, false);
    toggleModals(forbidModal, false);
    console.log('Password has been cleared!');
});

//reset button
resetBtn.addEventListener('click', () => {
    if(lastCheck){
        inputArea.value = lastCheck;
        console.log(`Fine, keep your weak password: ${lastCheck}`);
    } else {
        console.log('No password to revert to!!')
    }

    toggleShowPass.checked = false;
    inputArea.type ='password';
});
