const  controller = (function(crmCtrl, uiCtrl){

// Функция по прослушке событий
	function setupEventListener(){
		const DOM = uiCtrl.getDomStrings();
		document.querySelector(DOM.form).addEventListener("submit", ctrlAddItem);
	};

//  Функция на добавление новой заявки в модель
	function ctrlAddItem(event){
		event.preventDefault();
		// 1. Получить данные из формы
        const input = uiCtrl.getInput();
        // Проверка на пустые поля и корректный Email
        if ( input.name !== "" && input.phone !== "") {
			if (crmCtrl.validateEmail(input.email)){
	        	// 2. Добавить полученные данные в модель
	        	crmCtrl.addRequest(input.name, input.phone, input.email, input.product, "new");
	        	// 3. Обратная свзязь и обнуление полей
	        	uiCtrl.outputAlert("Спасибо за ваше обращение, заявка принята в работу")
	        	uiCtrl.removeInputValue();
	        	// Генерация тестовых данных после обнуления полей
	        	generateTestData.init();
			} else {
				uiCtrl.outputAlert("Введите корректный Email");
			};
		}
	};

	return {
		init: function(){
			setupEventListener();
		}
	};
})(modelController, formViewController);
controller.init();