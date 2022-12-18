var generateTestData = (function(){
	var ExampleRequest = function(name, phone, email, productValue){
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.productValue = productValue;
	};

	var testData = [
		new ExampleRequest("Павел Степанов", "89023714349", "gfsdgdg@mail.ru", "courseHtml"),
		new ExampleRequest("Дмитрий Волжский", "89228714624", "trew45e@yandex.ru", "courseJs"),
		new ExampleRequest("Николай Петров", "89328752749", "pbxdsd4@gmail.com", "courseVue"),
		new ExampleRequest("Анатолий Борисов", "89228313343", "88345h@mail.ru", "courseHtml"),
		new ExampleRequest("Ян Мельников", "89487166695", "hgdfrye@yandex.ru", "coursePhp"),
		new ExampleRequest("Константин Мартынов", "89221745619", "3ertg@mail.ru", "courseHtml"),
		new ExampleRequest("Роман Быков", "89028712649", "pwert@mail.ru", "courseHtml"),
		new ExampleRequest("Вадим Крылов", "89025689649", "pwuinjad@gmail.com", "coursePhp"),
		new ExampleRequest("Борис Рыжий", "89028712649", "dgfdse@gmail.com", "courseJs"),
		new ExampleRequest("Владимир Шкаринов", "89028712649", "587hjg@gmail.com", "courseVue"),
		new ExampleRequest("Александр Мелков", "89028712649", "2018@yandex.ru", "courseWordpress"),
		new ExampleRequest("Данил Брест", "89028712649", "trek2020@mail.ru", "courseHtml"),
		new ExampleRequest("Григорий Колокольников", "89028712649", "gionmal@gmail.com", "coursePhp"),
		new ExampleRequest("Виктор Пражский", "89028712649", "qwerty@yandex.ru", "courseWordpress"),
		new ExampleRequest("Станислав Худобяк", "89028712649", "fsqewef@gmail.com", "courseWordpress")
	];

	function getRandomInt (max){
		return Math.floor(Math.random()*max);
	};

	function insertInUi() {
		var random = getRandomInt(testData.length);
		var randomItem = testData[random];
		
		document.querySelector("#input__name").value = randomItem.name;
		document.querySelector("#input__phone").value = randomItem.phone;
		document.querySelector("#input__email").value = randomItem.email;
		document.querySelector("#exampleFormControlSelect1").value = randomItem.productValue;
	};

	return {
		init: insertInUi
	}
})();
generateTestData.init();