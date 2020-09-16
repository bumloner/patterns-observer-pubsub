class Subject {
	constructor() {
		this.subscribers = new Array();
	}

	// подписываем наблюдателя на источник
	subscribe(observer) {
		this.subscribers.push(observer);
	}

	// отписываем наблюдателя от источника
	unsubscribe(observer) {
		this.subscribers.forEach(function(element,index) {
			if(element == observer) {
				this.subscribers.splice(index,1);
				return;
			}
		},this);
	}

	// отправляем сообщение подписанным наблюдателям
	publish(message) {
		this.subscribers.forEach(function(element) {
			element(message);
		});
	}
}



// Пример работы

// источники
var bloger1 = new Subject();
var bloger2 = new Subject();
var bloger3 = new Subject();

// наблюдатели
var observer1 = {
	send1: function(message) {
		console.log('Первый наблюдатель получил сообщение: \'' + message + '\'');
	}
}

var observer2 = {
	send2: function(message) {
		console.log('Второй наблюдатель получил сообщение: \'' + message + '\'');
	}
}

var observer3 = {
	send3: function(message) {
		console.log('Третий наблюдатель получил сообщение: \'' + message + '\'');
	}
}

var observer4 = {
  send4: function(message) {
		console.log('Четвертый наблюдатель получил сообщение: \'' + message + '\'');
	}
}

bloger1.subscribe(observer2.send2);
bloger1.subscribe(observer4.send4);
bloger2.subscribe(observer3.send3); // будет отписан
bloger3.subscribe(observer1.send1); // будет отписан
bloger3.subscribe(observer2.send2);
bloger3.subscribe(observer3.send3);
bloger3.subscribe(observer4.send4);

bloger2.unsubscribe(observer3.send3);
bloger3.unsubscribe(observer1.send1);

// Итого bloger2 без подписчиков и observer1 без подписок

bloger1.publish('Первая новость');
bloger2.publish('Вторая новость');
bloger3.publish('Третья новость');

console.log('Подписчики первого блогера:');
console.log(bloger1.subscribers);
console.log('Подписчики второго блогера:');
console.log(bloger2.subscribers);
console.log('Подписчики третьего блогера:');
console.log(bloger3.subscribers);
