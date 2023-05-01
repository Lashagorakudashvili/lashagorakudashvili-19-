//1
const form = document.querySelector('form');
const mobileNumberInput = document.getElementById('mobile-number');
const repeatPasswordInput = document.getElementById('repeat-password');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const modal = document.querySelector('#success-modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-btn');


function checkMobileNumber() {
  const mobileNumberValue = mobileNumberInput.value;
  if (!/^\d{9}$/.test(mobileNumberValue)) {
    mobileNumberInput.parentElement.querySelector('.message').innerText =
      'Please enter a valid mobile number (exactly 9 digits)';
    return false;
  } else {
    mobileNumberInput.parentElement.querySelector('.message').innerText = '';
    return true;
  }
}

function checkEmail() {
  if (emailInput.validity.valueMissing) {
    emailInput.parentElement.querySelector('.message').innerText =
      'Email is required';
    return false;
  } else if (!/@gmail.com$/.test(emailInput.value)) {
    emailInput.parentElement.querySelector('.message').innerText =
      'Email must be a Gmail address';
    return false;
  } else {
    emailInput.parentElement.querySelector('.message').innerText = '';
    return true;
  }
}

function checkPassword() {
  const passValue = passwordInput.value;
  const repeatPassValue = repeatPasswordInput.value;
  if (passValue.length < 5) {
    passwordInput.parentElement.querySelector('.message').innerText =
      'Weak password';
    passwordInput.classList.remove('normal');
    passwordInput.classList.remove('strong');
    passwordInput.classList.add('weak');
    return false;
  } else if (passValue.length >= 5 && passValue.length < 8) {
    passwordInput.parentElement.querySelector('.message').innerText =
      'Normal password';
    passwordInput.classList.remove('weak');
    passwordInput.classList.remove('strong');
    passwordInput.classList.add('normal');
  } else {
    passwordInput.parentElement.querySelector('.message').innerText = '';
    passwordInput.classList.remove('weak');
    passwordInput.classList.remove('normal');
    passwordInput.classList.add('strong');
  }

  if (passValue !== repeatPassValue) {
    repeatPasswordInput.parentElement.querySelector('.message').innerText =
      'Passwords do not match';
    return false;
  } else {
    repeatPasswordInput.parentElement.querySelector('.message').innerText = '';
    return true;
  }
}

mobileNumberInput.addEventListener('input', checkMobileNumber);
emailInput.addEventListener('input', checkEmail);
passwordInput.addEventListener('input', checkPassword);
repeatPasswordInput.addEventListener('input', checkPassword);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isMobileNumberValid = checkMobileNumber();
  const isEmailValid = checkEmail();
  const isPasswordValid = checkPassword();

  if (isMobileNumberValid && isEmailValid && isPasswordValid) {
    showModal('#success-modal');
    form.reset();
  }
});

function showModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    const closeBtn = modal.querySelector('.close-btn');

    modal.classList.add('active');
    closeBtn.addEventListener('click', (e) => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        modal.classList.remove('active');
      }
    });
  }
}

openModal.addEventListener('click', (e) => {
  showModal('#error-modal');
});