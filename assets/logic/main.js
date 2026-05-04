
//Grab the checker's button ids
const inputArea = document.getElementById('input-Pass');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resetBtn = document.getElementById('reset-btn');

//Grab the modal element Ids
const forbidModal = document.getElementById('forbiddenModal');
const closeForbidBtn = document.getElementById('close-forbid-modal');
const enhanceModal = document.getElementById('passwd-enhancer');
const confirmEnhanceBtn = document.getElementById('enhance');
const cancelEnhanceBtn = document.getElementById('cancel-enhance');

const toggleModals = (modal, show) => {
    modal.style.display = show ? 'block' : 'none';
};


//Activating the check button
checkBtn.addEventListener('click', () => {
    const passwd = inputArea.value;
    const report = passwdCheck(passwd);

    if(report.results.forbidden){
        console.log('Your password is too simple and therefore it is forbidden! Please enter a new password!');
        toggleModal(forbidModal, true);
            return;
        };
//continue on to normal strength report if no forbidden password
    console.log(`Password Strength: ${report.strength}`);
    console.log(`Detailed Report:`, report.results);

    if(report.strength === 'Weak' || report.strength === 'Moderate'){
        toggleModal(enhanceModal, true);
    }else{
        toggleModal(enhanceModal, false);
    }
});

confirmEnhanceBtn.addEventListener('click', () => {
    const newPass = enhancePasswd(14);
    inputArea.value = newPass;
    toggleModal(enhanceModal, false);
    console.log(`Your password has been enhanced to a strong password. Your new password is ${newPass}`);
});

closeForbidBtn.addEventListener('click', () => toggleModal(forbidModal, false));
cancelEnhanceBtn.addEventListener('click', () => toggleModal(enhanceModal, false));


//Activating the clear button
clearBtn.addEventListener('click', () => {
    inputArea.value = "";
    toggleModal(enhaceModal, false);
    toggleModal(forbidModal, false);
    console.log('Password has been cleared!');
});


//Activation of reset button
resetBtn.addEventListener('click', () => {

    console.log('Fine, keep your weak password');
});
