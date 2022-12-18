const modelController = (function(){

	const Request = function(id, date, name, phone, email, product, status){
		this.id = id;
		this.date = date;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.product = product;
		this.status = status;
	};

// Данные по всем заявкам
	let data = {
		allRequest: []
	};

// Данные по продуктам
	const allProducts = {
		courseHtml: "Курс по верстке",
		courseJs: "Курс по JavaScript",
		courseVue: "Курс по VUE JS",
		coursePhp: "Курс по PHP",
		courseWordpress: "Курс по WordPress"
	};

// Данные по счетчику
	const counter = {
		all: 0,
		new: 0,
		inwork: 0,
		success:0,
		archive: 0
	};

// Данные по статусам
	const allStatus = {
		new: ["danger", "Новый"],
		inwork: ["warning", "В работе"],
		expected: ["expected", "Ожидается оплата"],
		success: ["success", "Завершенный"],
		reject: ["reject", "Отказ"],
		archive: ["archive", "Архив"]
	};

// Проверка localStorage на наличие данных
	setData();
	function setData(){
		if(localStorage.getItem("data")){
			data = JSON.parse(localStorage.getItem("data"));
		}
	};

// Получаем все заявки из localStorage
	function getData(){
		if(localStorage.getItem("data")){
			data = JSON.parse(localStorage.getItem("data"));
			return data;
		} else {
			return false;
		}
	};

// Создаем новый объект с заявкой
	function addRequest(name, phone, email, product, status){
		var newRequest, ID;
		// Генерируем ID
        if (data.allRequest.length > 0 ) {
            var lastIndex = data.allRequest.length - 1;
            ID = data.allRequest[lastIndex].id + 1;
        } else {
            ID = 0;
        };
        // Записываем дату
        const date = new Date().toLocaleDateString();
        // Создаем объект с данными из заявки
        newRequest = new Request(ID, date, name, phone, email, product, status);
        // Актуализируем базу данных (был выявлен баг - после редактирования заявок переходим на страницу добавления новых заявок, и если добавить новую заявку без Обновления данной страницы, то все редактируемые данные обнуляются, с данной функцией все данные актуальные)
		setData();
        // Записываем наш объект в структуру данных
        data.allRequest.push(newRequest);
        // Сохраняем данные в localStorage
		localStorage.setItem("data", JSON.stringify(data));
        // Возвращаем объект
        return newRequest;
	};

// Сохраняем данные для редактирования заявки в LC 
	function saveDataForEdit(currentID){
		data.allRequest.forEach(function(item){
			if(item.id == currentID){
				// Записываем данные по редактируемой заявке в LocalStorage
				localStorage.setItem("editItem", JSON.stringify(item));
			}
		});
	};

// Получаем данные из LC по редактируемой заявке и передаем их
	function transferEditRequest(){
		const editRequest = JSON.parse(localStorage.getItem("editItem"));
		return editRequest;
	};
	
// Сохраняем отредактированные данные в модель и пересохраняем LC
	function saveEditDataAndSaveLC(valuesOfFormArray, index, link){
		data.allRequest[index].product = valuesOfFormArray.product;
		data.allRequest[index].name = valuesOfFormArray.name;
		data.allRequest[index].email = valuesOfFormArray.email;
		data.allRequest[index].phone = valuesOfFormArray.phone;
		if(link == "saveLink"){
			data.allRequest[index].status = valuesOfFormArray.status;
		} else {
			// Статус при удалениии в архив
			data.allRequest[index].status = "archive";
		};
		// Сохраняем данные в LC
		localStorage.setItem("data", JSON.stringify(data));
	};

// Функция проверки email
	function validateEmail(email) {
		var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
		//.+@.+\\..+
		return pattern.test(email);
	};

// Получение данных для счетчика 
	function getObjWithCounter(){
		// Считаем кол-во заявок по статусам
		data.allRequest.forEach(function(item){
			if(item.status == "new"){
				counter.new++;
			} else if(item.status == "inwork"){
				counter.inwork++;
			} else if(item.status == "success"){
				counter.success++;
			} else if(item.status == "archive"){
				counter.archive++;
			}
		});
		// Кол-во всех заявок
		counter.all = counter.new + counter.inwork + counter.success + counter.archive;
		return counter;
	};

// Получение всех заявок с определенным статусом
	function getRequestWithSelectedStatus(selectedStatus){
		const arrRequest = [];
		data.allRequest.forEach(function(item){
			if(selectedStatus == item.status){
				arrRequest.push(item);
			}
		});
		// Сохраняем в LC выбранный статус
		localStorage.setItem("statusArr", JSON.stringify(arrRequest));
		// Сохраняем в LC массив заявок с данным статусом
		localStorage.setItem("selectStatus", JSON.stringify(selectedStatus));
		return arrRequest;
	};

// Получение всех заявок с определенным продуктом 
	function getRequestWithSelectedProduct(selectedProduct){
		const arrRequest = [];
		data.allRequest.forEach(function(item){
			if(selectedProduct == item.product){
				arrRequest.push(item);
			}
		});
		// Сохраняем в LC выбранный продукт
		localStorage.setItem("productArr", JSON.stringify(arrRequest));
		// Сохраняем в LC массив заявок с данным продуктом
		localStorage.setItem("selectProduct", JSON.stringify(selectedProduct));
		return arrRequest;
	};

// Перекрестная выборка массива
	function doubleFilterData(){
		// Задаем первичные данные для выборки
		let selectStatus = "all";
		let selectProduct = "Все продукты";
		let productArr = [];
		let statusArr = [];
		const arrRequest = [];
		// Получаем выбранный Статус из LC
		if(localStorage.getItem("selectStatus")){
			selectStatus = JSON.parse(localStorage.getItem("selectStatus"));
		}
		// Получаем выбранный Продукт из LC
		if(localStorage.getItem("selectProduct")){
			selectProduct = JSON.parse(localStorage.getItem("selectProduct"));
		}
		// Получаем массив заявок по выбранному продукту из LC
		if(localStorage.getItem("productArr")){
			productArr = JSON.parse(localStorage.getItem("productArr"));
		}
		// Получаем массив заявок по выбранному статусу из LC
		if(localStorage.getItem("statusArr")){
			statusArr = JSON.parse(localStorage.getItem("statusArr"));
		}
		// Начинаем фильтрацию и возвращение нужного массива
		if(productArr.length > 0 && statusArr.length > 0){
			productArr.forEach(function(item){
				let prID = item.id;
				statusArr.forEach(function(item){
					if(prID == item.id){
		               	arrRequest.push(item);
					}
				});
			});
			return arrRequest; // Массив с выборкой по продукту и по статусу
		} else if(productArr.length > 0 && statusArr.length == 0){
			if(selectStatus !== "all"){
				return arrRequest; // Пустой массив
			} else {
				return productArr; // Массив с заявками по продуктам
			}
		} else if(productArr.length == 0 && statusArr.length > 0){
			if(selectProduct !== "Все продукты"){
				return arrRequest; // Пустой массив
			} else {
				return statusArr; // Массив с заявками по статусу
			}
		} else if (productArr.length == 0 && statusArr.length == 0){
			if(selectStatus == "all" && selectProduct == "Все продукты"){
				return data.allRequest // Массив со всеми заявками
			} else {
				return arrRequest; // Пустой массив
			}
		}
	};

	return {
		addRequest,
		getData,
		allProducts,
		allStatus,
		saveDataForEdit,
		transferEditRequest,
		saveEditDataAndSaveLC,
		getObjWithCounter,
		validateEmail,
		getRequestWithSelectedStatus,
		getRequestWithSelectedProduct,
		doubleFilterData 
	};
})();