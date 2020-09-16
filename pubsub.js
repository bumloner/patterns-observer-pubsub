class EventChannel {
	constructor() {
		this.rooms = new Array();
	}

	// подписываем наблюдателя
	subscribe(subscriber,room) {
		if(!Array.isArray(this.rooms[room])) {
			this.rooms[room] = new Array();
		}
		if(room in this.rooms) {
			this.rooms[room].push(subscriber);
		}
	}

	// отправляем сообщение
	publish(room,message) {
		if(room in this.rooms) {
			this.rooms[room].forEach(function(element) {
				element(message);
			});
		}
	}
}



// Пример работы

var eventer = new EventChannel();

// подписчики
var subscriber1 = {
	send1: function(message) {
		console.log('Первый наблюдатель получил сообщение \'' + message + '\'');
	}
}

var subscriber2 = {
	send2: function(message) {
		console.log('Второй наблюдатель получил сообщение \'' + message + '\'');
	}
}

var subscriber3 = {
	send3: function(message) {
		console.log('Третий наблюдатель получил сообщение \'' + message + '\'');
	}
}

eventer.subscribe(subscriber1.send1,'main');
eventer.subscribe(subscriber1.send1,'other');
eventer.subscribe(subscriber3.send3,'main');

eventer.publish('main','Первая новость');
eventer.publish('main','Вторая новость');
eventer.publish('other','Третья новость');
eventer.publish('unknown','Четверная новость');
eventer.publish('other','Пятая новость');

console.log('Список комнат:');
console.log(eventer.rooms);
