import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
export const copyR = (src: string, dest: string) => execSync(`cp -r ${src} ${dest}`);
export const isEmpty = (data: any): boolean => {
	if (!data) {
		return true;
	}
	if (typeof data === 'string') {
		return data.replace(/\s+/g, '') === '';
	}
	if (Array.isArray(data)) {
		return data.length === 0;
	}
	return JSON.stringify(data) === '{}';
};
export const stringify = (obj: any, tabs: number = 4) => JSON.stringify(obj, null, tabs);

export async function runInSeries<T extends any>(values: T[], fn: (x: T) => any) {
	for (const value of values) {
		await fn(value);
	}
}
export const lines = (str: string = '') => str.trim().split('\n');
export const removeAll = <T>(arr: T[], val: T[]) =>
	val.reduce((res, cur) => {
		if (res.indexOf(cur) !== -1) {
			res.splice(res.indexOf(cur), 1);
		}
		return res;
	}, arr);
export const mkdir = (...args: string[]) => {
	const absPath = join(...args);
	if (!existsSync(absPath)) {
		mkdirSync(absPath);
	}
};
export const mkdirFromHome = (...args: string[]) => {
	mkdir(require('os').homedir(),...args);
};
