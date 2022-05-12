import { ActionInterface } from './constants';
/**
 * Checkout file from branch
 */
export declare function runCheckout(options: ActionInterface): Promise<void>;
/**
 * Save file into branch
 */
export declare function runSave(options: ActionInterface): Promise<void>;
