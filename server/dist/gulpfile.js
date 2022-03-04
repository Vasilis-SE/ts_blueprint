"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const gulp_typescript_1 = __importDefault(require("gulp-typescript"));
const tsProject = gulp_typescript_1.default.createProject('tsconfig.json');
gulp_1.default.task('default', function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp_1.default.dest('dist'));
});
