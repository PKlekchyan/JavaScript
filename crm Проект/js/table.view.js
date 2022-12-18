const tableViewController = (function(){

	const DOMstrings = {
		tableList: "#table-list",
		filterLink: ".filter-link",
		inputGroupSelect: "#inputGroupSelect",
		product: ".product",
		editLink: "a.edit",
		linkWithCounter: ".counter",
		request: ".request",
		badgeCounter: ".badge"
	};
	const DOMelements = {
		filterLink: document.querySelectorAll(DOMstrings.filterLink),
		input: document.querySelector(DOMstrings.inputGroupSelect),
		tableList: document.querySelector(DOMstrings.tableList)
	};

// Добавляем заявки в таблицу
	function addAllRequest(array, statusRequest, productRequest){
		if(array){
			array.forEach(function(item){
				const html = `<tr class="request" data-status="${item.status}">
		                    <th scope="row">${item.id}</th>
		                    <td>${item.date}</td>
		                    <td class="product">${productRequest[item.product]}</td>
		                    <td>${item.name}</td>
		                    <td>${item.email}</td>
		                    <td>${item.phone}</td>
		                    <td>
		                        <div class="badge badge-pill badge-${statusRequest[item.status][0]}">
		                            ${statusRequest[item.status][1]}
		                        </div>
		                    </td>
		                    <td>
		                        <a href="03-crm-edit-bid.html" class="edit" data-id="${item.id}">Редактировать</a>
		                    </td>
		                </tr>`;
		        document.querySelector(DOMstrings.tableList).insertAdjacentHTML("beforeend", html);
			});
		}	
	};

// Отображаем активную ссылку 
	function displayActiveLink(choiceLink){
		const link = document.querySelectorAll(DOMstrings.filterLink);
		link.forEach(function(item){
			item.classList.remove("active");
		});
		choiceLink.classList.add("active");
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

// Удаляем все заявки
	function removeAllRequest(){
		const request = document.querySelectorAll(DOMstrings.request);
		request.forEach(function(item){
			item.remove();
		});
	};

	return {
		getDomStrings: function(){
			return DOMstrings; },
		DOMelements,
		addAllRequest,
		displayCounter,
		displayActiveLink,
		removeAllRequest
	};
})();