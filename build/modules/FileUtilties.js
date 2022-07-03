"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtilties = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileUtilties {
    constructor() {
        var _a;
        this.rootPath = ((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.path) || "";
    }
    importFromDirectories(directoryPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const exports = [];
            for (let directoryPath in directoryPaths) {
                const data = yield this.importFromDirectory(directoryPaths[directoryPath]);
                if (data)
                    exports.push(...data);
            }
            return exports;
        });
    }
    importFromDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { files, folders } = yield this.simplifyDirectory(directoryPath);
            return files.find(file => file == "index.js") ? [yield this.importFromFile(directoryPath + path_1.default.sep + "index.js")] : [
                ...yield this.importFromDirectories(folders.map(folder => directoryPath + path_1.default.sep + folder)),
                ...yield this.importFromFiles(files.map(file => directoryPath + path_1.default.sep + file))
            ];
        });
    }
    importFromFiles(filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const exports = [];
            for (let filePath in filePaths) {
                const data = yield this.importFromFile(filePaths[filePath]);
                if (data)
                    exports.push(data);
            }
            return exports;
        });
    }
    importFromFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { default: raw } = yield Promise.resolve().then(() => __importStar(require(filePath))).catch((err) => console.log(`[FileUtilties] Unable to import ${filePath}\n${err}`));
            const data = Object.getPrototypeOf(raw) ? new raw : raw;
            return data;
        });
    }
    simplifyDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield fs_1.default.readdirSync(directoryPath);
            let folders = files.filter(name => !name.includes("."));
            files = files.filter(name => name.endsWith(".js"));
            return { files, folders };
        });
    }
    pathFromRoot(toPath) {
        var _a;
        return ((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.path) + path_1.default.sep + toPath;
    }
}
exports.FileUtilties = FileUtilties;
