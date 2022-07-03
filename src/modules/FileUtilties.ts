import path from "path";
import fs from "fs"

export class FileUtilties {
    rootPath: string = require?.main?.path || ""

    async importFromDirectories(directoryPaths: string[]) {
        const exports: any[] = [];
        for (let directoryPath in directoryPaths) {
            const data = await this.importFromDirectory(directoryPaths[directoryPath])
            if (data) exports.push(...data)
        }
        return exports
    }

    async importFromDirectory(directoryPath: string) {
        const { files, folders } = await this.simplifyDirectory(directoryPath)

        return files.find(file => file == "index.js") ? [await this.importFromFile(directoryPath + path.sep + "index.js")] : [
            ...await this.importFromDirectories(folders.map(folder => directoryPath + path.sep + folder)),
            ...await this.importFromFiles(files.map(file => directoryPath + path.sep + file))
        ];
    }

    async importFromFiles(filePaths: string[]) {
        const exports: any[] = [];
        for (let filePath in filePaths) {
            const data = await this.importFromFile(filePaths[filePath])
            if (data) exports.push(data)
        }
        return exports
    }

    async importFromFile(filePath: string) {
        const { default: raw } = await import(filePath).catch((err) => console.log(`[FileUtilties] Unable to import ${filePath}\n${err}`))
        const data: any = Object.getPrototypeOf(raw) ? new raw : raw
        return data
    }

    async simplifyDirectory(directoryPath: string) {
        let files = await fs.readdirSync(directoryPath)
        let folders = files.filter(name => !name.includes("."))
        files = files.filter(name => name.endsWith(".js"))

        return { files, folders }
    }

    pathFromRoot(toPath: string) {
        return require?.main?.path + path.sep + toPath
    }
}