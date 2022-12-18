var controller = (function(crmCtrl, uiCtrl){
	// const DOM = uiCtrl.getDomStrings();
	const data = crmCtrl.getData();

// Получаем данные по редактируемой заявке из модели
	const editRequest = crmCtrl.transferEditRequest();

// Заполняем форму первичными данными
	uiCtrl.fillFormDataRequest(editRequest);

// Прослушка событий
	function setupEventListener(){
		const DOMelements = uiCtrl.DOMelements;
		// 1. Ловим событие сохранения заявки и записываем выбранные данные
		DOMelements.saveLink.addEventListener("click", saveEditRequest)
		// 2. Ловим событие кнопки Добавить в архив
		DOMelements.archiveLink.addEventListener("click", saveEditRequest)
		// 3. Возврат на стрницу со всеми заявками по кнопке Вернуться назад
		DOMelements.comeBackLink.addEventListener("click", bactToTable)
	};

// Действие по кнопке сохранения и удаления в архив
	function saveEditRequest(event){
		const link = event.target.id;
		// Получаем измененные данные из формы
		const valuesOfForm = uiCtrl.getEditDataRequest();
		// Валидируем поля
		data.allRequest.forEach(function(item, index){
			if(item.id == editRequest.id){
				// Проверка на пустые значения
				if(valuesOfForm.name !== "" && valuesOfForm.phone !== "" && valuesOfForm.status !== ""){
					// Проверка на корректность почты
					if (crmCtrl.validateEmail(valuesOfForm.email)){
						// Перезаписываем данные в модели и сохраняем на LC
						crmCtrl.saveEditDataAndSaveLC(valuesOfForm, index, link);
						// Возвращаемся на страницу с заявками
						backToTableRequest();
					} else {
						uiCtrl.outputAlert("Введите корректную почту");
					};
				} else {
					uiCtrl.outputAlert("Введите все данные");
				};
			}
		});
	};

// Действие по кнопке вернуться назад
	function bactToTable(event){
		event.preventDefault();
		// Возвращаемся на страницу с заявками
		backToTableRequest();
	};

// Функция возврата к странице с заявками
	function backToTableRequest(){
		localStorage.removeItem("editItem");
	    window.location = '02-crm-all-bids.html';
	};

// Отображение счетчика
	function getCounterDataAndDisplay(){
		// Получение объекта со значениями
		const counter = crmCtrl.getObjWithCounter(); 
		// Отображаем счетчик по кол-ву заявок
		uiCtrl.displayCounter(counter);
	};

	return {
		init: function(){
			setupEventListener();
			getCounterDataAndDisplay();
		}
	};
})(modelController, editViewController);
controller.init();