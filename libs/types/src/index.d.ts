/// <reference types="@total-typescript/ts-reset" />
/// <reference types="@ark/util" />
/// <reference types="angular-router-menus" />

/*
 * Our environment variables.
 */

declare type BUILD_ENV = 'development' | 'staging' | 'production'
declare type NODE_ENV = BUILD_ENV | undefined

declare const BUILD_ENV: BUILD_ENV
declare const BUILD_DATE: string
declare const APP_VERSION: string
declare const APP_HASH: string
declare const NONCE: string

/**
 * Our application menus for `angular-router-menus`.
 */
declare type Menus = 'main'
declare type MenuItemIcon = import('@fortawesome/fontawesome-common-types').IconName

/*
 * Override object constructor types to make them safe.
 */
declare interface ObjectConstructor {
	keys<T extends object>(o: T): (keyof T)[]
	values<T extends object>(o: T): T[keyof T][]
	entries<T extends object>(o: T): [keyof T, T[keyof T]][]
}
