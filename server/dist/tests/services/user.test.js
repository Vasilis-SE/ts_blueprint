"use strict";
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
const user_1 = require("../../src/interfaces/user");
const user_2 = __importDefault(require("../../src/services/user"));
describe('User service class _getUserFilters function check', () => {
    test('Passing filters returns correct output', () => __awaiter(void 0, void 0, void 0, function* () {
        const filters = {
            page: 0,
            limit: 10,
            order: 'id',
            sort: 'ASC',
        };
        let _service = new user_2.default();
        const result = yield _service._getUserFilters(filters);
        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(Object.keys(result)).toEqual(expect.arrayContaining(['orderby', 'limit']));
        expect(result.orderby).not.toBeNull();
        expect(result.limit).not.toBeNull();
        const calcOffset = filters.page * filters.limit;
        expect(result.orderby).toEqual(`${filters.order} ${filters.sort}`);
        expect(result.limit).toEqual(`${filters.limit} OFFSET ${calcOffset}`);
    }));
    test('Empty filters returns fallback values', () => __awaiter(void 0, void 0, void 0, function* () {
        const filters = {};
        let _service = new user_2.default();
        const result = yield _service._getUserFilters(filters);
        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(Object.keys(result)).toEqual(expect.arrayContaining(['orderby', 'limit']));
        expect(result.orderby).not.toBeNull();
        expect(result.limit).not.toBeNull();
        const calcOffset = 0 * user_1.UserGlobals.QUERY_LENGTH;
        expect(result.orderby).toEqual(`${user_1.UserGlobals.QUERY_ORDER_FIELD} ${user_1.UserGlobals.QUERY_SORT_METHOD}`);
        expect(result.limit).toEqual(`${user_1.UserGlobals.QUERY_LENGTH} OFFSET ${calcOffset}`);
    }));
});
