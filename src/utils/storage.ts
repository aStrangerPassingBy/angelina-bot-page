/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function getLocalStorage(key: string) {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
}

/**
 * @description 保存localStorage
 * @param {String} key Storage名称
 * @param {any} value 保存的值
 * @return void
 */
export function setLocalStorage(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @return void
 */
 export function clearLocalStorage() {
	window.localStorage.clear();
}

/**
 * @description 删除localStorage内的某个值
 * @param {String} key Storage名称
 * @return void
 */
 export function removeLocalStorage(key: string) {
	window.localStorage.removeItem(key);
}

/**
 * @description 获取sessionStorage
 * @param {String} key Storage名称
 * @return string
 */
export function getSessionStorage(key: string) {
	const value = window.sessionStorage.getItem(key);
	try {
		return JSON.parse(window.sessionStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
}

/**
 * @description 保存sessionStorage
 * @param {String} key Storage名称
 * @param {any} value 保存的值
 * @return void
 */
export function setSessionStorage(key: string, value: any) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除sessionStorage
 * @return void
 */
 export function clearSessionStorage() {
	window.sessionStorage.clear();
}

/**
 * @description 删除sessionStorage内的某个值
 * @param {String} key Storage名称
 * @return void
 */
 export function removeSessionStorage(key: string) {
	window.sessionStorage.removeItem(key);
}