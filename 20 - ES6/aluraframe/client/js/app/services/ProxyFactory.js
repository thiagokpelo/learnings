class ProxyFactory {

	static create(obj, props, action) {

		return new Proxy(obj, {

			get(target, prop, receiver) {

				if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {

					return function() {

						console.log(`Interceptando: ${prop}`);
						Reflect.apply(target[prop], target, arguments);
						return action(target);
					}
				}

				return Reflect.get(target, prop, receiver);
			},

			set(target, prop, value, receiver) {

				let retorno = Reflect.set(target, prop, value, receiver);
				if(props.includes(prop)) action(target);
				return retorno;
			}
		});
	}

	static _isFunction(func) {

		return typeof(func) == typeof(Function);
	}
}