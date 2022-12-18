var editViewController = (function(){
	
	const DOMstrings = {
		IDrequest: "#IDrequest",
		dateRequest: "#dateRequest",
		productRequest: "#inputGroupSelect01",
		nameRequest: "#nameRequest",
		emailRequest: "#emailRequest",
		phoneRequest: "#phoneRequest",
		statusRequest: "#inputGroupSelect02",
		saveLink: "#saveLink",
		archiveLink: "#deleteToArchive",
		comeBackLink: "#comeBack",
		linkWithCounter: ".counter"
	};
	const DOMelements = {
		saveLink: document.querySelector(DOMstrings.saveLink),
		archiveLink: document.querySelector(DOMstrings.archiveLink),
		comeBackLink: document.querySelector(DOMstrings.comeBackLink)
	};

// Заполняем форму первичными данными
	function fillFormDataRequest(obj){
		document.querySelector(DOMstrings.IDrequest).innerText = `Заявка № ${obj.id}`;
		document.querySelector(DOMstrings.dateRequest).innerText = obj.date;
		document.querySelector(DOMstrings.productRequest).value = obj.product;
		document.querySelector(DOMstrings.nameRequest).value = obj.name;
		document.querySelector(DOMstrings.emailRequest).value = obj.email;
		document.querySelector(DOMstrings.phoneRequest).value = obj.phone;
		document.querySelector(DOMstrings.statusRequest).value = obj.status;
	};

// Передаем измененные данные в форме 
	function getEditDataRequest(){
		return {
			product: document.querySelector(DOMstrings.productRequest).value,
			name: document.querySelector(DOMstrings.nameRequest).value,
			email: document.querySelector(DOMstrings.emailRequest).value,
			phone: document.querySelector(DOMstrings.phoneRequest).value,
			status: document.querySelector(DOMstrings.statusRequest).value
		};
	};

// Отображение счетчика
	function displayCounter(obj){
		const linkWithCounter = document.querySelectorAll(DOMstrings.linkWithCounter);
		linkWithCounter.forEach(function(item){
			const nameStatus = item.dataset.status;
			if(obj[nameStatus] !== 0){
				html = `<div class="badge">${obj[nameStatus]}</div>`;
				item.insertAdjacentHTML("beforeend", html);
			}
		});
	};

// Вывод Alert
	function outputAlert(text){
		alert(text);
	};

	return {
		getDomStrings: function(){
			return DOMstrings; },
		DOMelements,
		fillFormDataRequest,
		getEditDataRequest,
		displayCounter,
		outputAlert
	};
})();