/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
	const browserLang = navigator.language;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
}

// 
export function getAssetsFile(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
}

// 
export function isValidKey(
	key: string | number | symbol, 
	object: object
	): key is keyof typeof object {
	return key in object
}

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}

