const controller = (function(crmCtrl, uiCtrl){
	const DOM = uiCtrl.getDomStrings();

// Заполняем таблицу CRM из LC
	// 1. Получаем заявки из LocalStorage
	const data = crmCtrl.getData();
	// 2. Данные из модели
	const allStatus = crmCtrl.allStatus;
	const allProducts = crmCtrl.allProducts;
	// 3. Добавляем заявки в таблицу
	uiCtrl.addAllRequest(data.allRequest, allStatus, allProducts);

// Прослушивание событий
	function setupEventListener(){
		const DOMelements = uiCtrl.DOMelements;
		// 1. Фильтр по статусу
		DOMelements.filterLink.forEach(function(item){
			item.addEventListener("click", statusFilter, true);
		});
		// 2. Фильтр по продуктам 
		DOMelements.input.addEventListener("change", productFilter(DOMelements));
		// 3. Ловим событие для редактирования заявки
		DOMelements.tableList.addEventListener("click", clickActionEdit);
	};
	
// Действие при выборе статуса
	function statusFilter(){
		// Находим выбранный статус
		const statusLink = event.target.dataset.status;
		if(statusLink !== undefined){
			// Отображаем активную ссылку
			uiCtrl.displayActiveLink(event.target);
			// Обнуляем классы
			uiCtrl.removeAllRequest();
			uiCtrl.addAllRequest(data.allRequest, allStatus, allProducts);
			// Получим все заявки с данным статусом из модели
			const requestArray = crmCtrl.getRequestWithSelectedStatus(statusLink);
			// Массив с перекрестной выборкой
			const doubleFilter = crmCtrl.doubleFilterData();
			// Отображаем все нужные заявки
			uiCtrl.removeAllRequest();
			uiCtrl.addAllRequest(doubleFilter, allStatus, allProducts);
		}	
	};

// Действие при выборе продукта
	function productFilter(DOMelements){
		return function(){
			// Обнуляем классы по продуктам
			uiCtrl.removeAllRequest();
			uiCtrl.addAllRequest(data.allRequest, allStatus, allProducts);
			// Выбранный продукт
			const select = DOMelements.input.value;
			// Находим все заявки с данным продуктом в модели
			const requestArray = crmCtrl.getRequestWithSelectedProduct(select);
			// Массив с перекрестной выборкой
			const doubleFilter = crmCtrl.doubleFilterData();
			// Отображаем все нужные заявки
			uiCtrl.removeAllRequest();
			uiCtrl.addAllRequest(doubleFilter, allStatus, allProducts);
		};
	};

// Действие при нажатии на редактирование
	function clickActionEdit(event){
		event.preventDefault();
		// Получаем необходимую ссылку
		if(event.target.matches(DOM.editLink)){
			// Находим необходимый статус
			const currentID = event.target.dataset.id
			// Записываем необходимые данные в модель для передачи на страницу редактирования
			crmCtrl.saveDataForEdit(currentID);
			// Перемещение к странице редактирования
			movingToEditPage();
		}
	};

// Перемещение на страницу редактирования
	function movingToEditPage(){
	    window.location = '03-crm-edit-bid.html';
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
})(modelController, tableViewController);
controller.init();