import { ActionInterface } from './constants';
export declare const extractErrorMessage: (error: unknown) => string;
export declare const isNullOrUndefined: (value: unknown) => boolean;
interface ExecuteOutput {
    stdout: string;
    stderr: string;
}
export declare const generateRepositoryPath: (options: ActionInterface) => string;
/** Strips the protocol from a provided URL. */
export declare const stripProtocolFromUrl: (url: string) => string;
/** Wrapper around the GitHub toolkit exec command which returns the output.
 * Also allows you to easily toggle the current working directory.
 *
 * @param {string} cmd - The command to execute.
 * @param {string} cwd - The current working directory.
 * @param {boolean} silent - Determines if the in/out should be silenced or not.
 * @param {boolean} ignoreReturnCode - Determines whether to throw an error
 * on a non-zero exit status or to leave implementation up to the caller.
 */
export declare function execute(cmd: string, cwd: string, silent?: boolean, ignoreReturnCode?: boolean): Promise<ExecuteOutput>;
export {};
