export declare class FileUtilties {
    rootPath: string;
    importFromDirectories(directoryPaths: string[]): Promise<any[]>;
    importFromDirectory(directoryPath: string): Promise<any[]>;
    importFromFiles(filePaths: string[]): Promise<any[]>;
    importFromFile(filePath: string): Promise<any>;
    simplifyDirectory(directoryPath: string): Promise<{
        files: string[];
        folders: string[];
    }>;
    pathFromRoot(toPath: string): string;
}
