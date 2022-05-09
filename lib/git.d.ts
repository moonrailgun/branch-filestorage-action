import { ActionInterface, Status } from './constants';
export declare function checkTargetBranchExist(options: ActionInterface): Promise<boolean>;
/**
 * check storage branch exist
 */
export declare function checkout(options: ActionInterface): Promise<Status>;
/**
 * Save file into worktree
 */
export declare function save(options: ActionInterface): Promise<Status>;
/**
 * clean jobs
 */
export declare function cleanupJobs(options: ActionInterface): Promise<void>;
