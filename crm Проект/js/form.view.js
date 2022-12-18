const formViewController = (function(){

	const DOMstrings = {
		form: "#crm-form",
		inputName: "#input__name",
		inputPhone: "#input__phone",
		inputEmail: "#input__email",
		selectProduct: "#exampleFormControlSelect1"
	};

// Получение данных из формы
	function getInput(){
		return {
			name: document.querySelector(DOMstrings.inputName).value,
			phone: document.querySelector(DOMstrings.inputPhone).value,
			email: document.querySelector(DOMstrings.inputEmail).value,
			product: document.querySelector(DOMstrings.selectProduct).value
		};
	};

// Обнуление полей формы
	function removeInputValue(){
		document.querySelector(DOMstrings.inputName).value = "";
		document.querySelector(DOMstrings.inputPhone).value = "";
		document.querySelector(DOMstrings.inputEmail).value = "";
	};

// Вывод Alert
	function outputAlert(text){
		alert(text);
	};
	return {
		getDomStrings: function(){
			return DOMstrings; },
		getInput,
		removeInputValue,
		outputAlert
	};
})();