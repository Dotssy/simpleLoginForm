"use strict";

function showError(container, message) {
	container.className = 'error';
	let msgElem = document.createElement('span');
	msgElem.className = 'error-message';
	msgElem.textContent = message;
	container.appendChild(msgElem);
}

function resetMessage(container) {
	container.className = '';
	if (container.lastChild.className == 'error-message' ||
		container.lastChild.className == 'focus-message') {
		container.removeChild(container.lastChild);
	}
}

function focusMessage(container, message) {
	let msgElem = document.createElement('span');
	msgElem.className = 'focus-message';
	msgElem.textContent = message;
	container.appendChild(msgElem);
}

function validate(form) {
	let elems = form.elements;
	let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	let sym = /[\?\!\№\#\%\:\;\*\/\\\+\-]/;
	let validationStatus = true;

	resetMessage(elems.email.parentNode);
	if (!reg.test(elems.email.value)) {
		showError(elems.email.parentNode, 'Please enter valid email');
		validationStatus = false;
	}

	resetMessage(elems.password.parentNode);
	if (elems.password.value.length < 8) {
		showError(elems.password.parentNode, 'Password must be at least 8 characters long');
		validationStatus = false;
		return;
	}
	if (!/[a-zA-Z]/.test(elems.password.value)) {
		showError(elems.password.parentNode, 'Password must contain at least 1 english letter');
		validationStatus = false;
		return;
	}
	if (!/[0-9]/.test(elems.password.value)) {
		showError(elems.password.parentNode, 'Password must contain at least 1 digit');
		validationStatus = false;
		return;
	}
	if (!sym.test(elems.password.value)) {
		showError(elems.password.parentNode, 'Password must contain special symbol (?!№#%:;*/\+-)');
		validationStatus = false;
		return;
	}

	return validationStatus;
}

let loginForm = document.forms['form'].elements;

loginForm.email.onfocus = function() {
	resetMessage(loginForm.email.parentNode);
	focusMessage(loginForm.email.parentNode, 'Type your email here');
}

loginForm.email.onblur = function() {
	resetMessage(loginForm.email.parentNode);
}

loginForm.password.onfocus = function() {
	resetMessage(loginForm.password.parentNode);
	focusMessage(loginForm.password.parentNode, 'Type your password here');
}

loginForm.password.onblur = function() {
	resetMessage(loginForm.password.parentNode);
}

loginForm['submit'].onclick = function(e) {
	if (!validate(document.forms['form'])) {
		e.preventDefault();
	}
}