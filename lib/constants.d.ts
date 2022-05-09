export interface ActionInterface {
    /**
     * The branch that the action should deploy to.
     *
     * @default "actions/filedb
     */
    branch: string;
    /**
     * File or Folder path for storage
     */
    path: string;
    /**
     * Token for github
     */
    token?: string;
    /**
     * The folder where your deployment project lives.
     */
    workspace: string;
    /**
     * Keep history only one commit
     */
    singleCommit?: boolean;
}
export declare const action: ActionInterface;
/** Status codes for the action. */
export declare enum Status {
    SUCCESS = "success",
    FAILED = "failed",
    SKIPPED = "skipped",
    RUNNING = "running"
}
