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
    /** The hostname of which the GitHub Workflow is being run on, ie: github.com */
    hostname?: string;
    /** The repository path, for example JamesIves/github-pages-deploy-action. */
    repositoryName?: string;
    /**
     * Keep history only one commit
     */
    singleCommit?: boolean;
    /** Defines an SSH private key that can be used during deployment. This can also be set to true to use SSH deployment endpoints if you've already configured the SSH client outside of this package. */
    sshKey?: string | boolean | null;
}
export declare const action: ActionInterface;
/** Status codes for the action. */
export declare enum Status {
    SUCCESS = "success",
    FAILED = "failed",
    SKIPPED = "skipped",
    RUNNING = "running"
}
