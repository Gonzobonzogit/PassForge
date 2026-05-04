
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

/*----The Vault--------
  Keep the input password in memory */
let lastCheck = '';


const toggleModals = (modal, show) => {
    modal.style.display = show ? 'block' : 'none';
};


//Activating the check button
const performCheck = () => {
    const passwd = inputArea.value;

    if(!passwd) return; //Stop the program from running an empty input line

    //Updates the vault every time a password is checkd
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
    }else{
        toggleModals(enhanceModal, false);
    }
};

checkBtn.addEventListener('click', performCheck);

//allow the user to click or press enter to run check

inputArea.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        performCheck();
    }
});

//Mask/unmask
toggleShowPass.addEventListener('change', () => {
    inputArea.type = toggleShowPass.checked ? 'text' : 'password';
});

//Enhancement is desired
confirmEnhanceBtn.addEventListener('click', () => {
    const newPass = enhancePasswd(14);
    inputArea.value = newPass;

    inputArea.type = 'text';
    toggleShowPass.checked = true;

    toggleModals(enhanceModal, false);
    console.log(`Your password has been enhanced to a strong password. Your new password is ${newPass}`);
});

//close and cancel
closeForbidBtn.addEventListener('click', () => toggleModals(forbidModal, false));
cancelEnhanceBtn.addEventListener('click', () => toggleModals(enhanceModal, false));


//Activating the clear button
clearBtn.addEventListener('click', () => {
    inputArea.value = "";
    toggleModals(enhanceModal, false);
    toggleModals(forbidModal, false);
    console.log('Password has been cleared!');
});


//Activation of reset button
resetBtn.addEventListener('click', () => {
    if(lastCheck){
        inputArea.value = lastCheck;
        console.log(`Fine, keep your weak password: ${lastCheck}`);
    } else {
        console.log('No password to revert to!!')
    }
});
