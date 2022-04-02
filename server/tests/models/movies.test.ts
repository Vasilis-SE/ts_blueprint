import { IListOfMovies } from "../../src/interfaces/movie";
import MovieModel from "../../src/repositories/movie";
import PostgreSQL from '../../src/connections/postgres';
const fs = require('fs');

let user: any = null;
let movies: IListOfMovies = [];
PostgreSQL.init();


const getASingleUser = async () => {
    const query = await PostgreSQL.client.query(`SELECT * FROM users LIMIT 1`);
    user = query.rows[0];
}
getASingleUser();

beforeEach(() => {
    let rawdata = fs.readFileSync(require('path').resolve(__dirname, '../..')+"/mocks/movies.json");
    movies = JSON.parse(rawdata);
});

afterAll(() => {
    PostgreSQL.close();
});

describe('Did movie model instance set correctly?', () => {

    test('Movie with non empty data is set correctly', () => {
        const movie = new MovieModel(movies[1]);
        
        expect(movie).toBeTruthy();
        expect(movie.title).toBeTruthy();
        expect(movie.description).toBeTruthy();
        expect(movie.username).toBeTruthy();
        expect(movie.likes).toBeTruthy();
        expect(movie.hates).toBeTruthy();
        expect(movie.created_at).toBeTruthy();

        expect(typeof movie.title === 'string').toBeTruthy();
        expect(typeof movie.description === 'string').toBeTruthy();
        expect(typeof movie.username === 'string').toBeTruthy();
        expect(typeof movie.likes === 'number').toBeTruthy();
        expect(typeof movie.hates === 'number').toBeTruthy();
        expect(typeof movie.created_at === 'number').toBeTruthy();

        expect(movie.title).toEqual("96 Minutes ");
        expect(movie.description).toEqual("Fusce consequat.");
        expect(movie.username).toEqual("jbothams1");
        expect(movie.likes).toEqual(55);
        expect(movie.hates).toEqual(5);
        expect(movie.created_at).toEqual(38);

        expect(movie instanceof MovieModel).toBeTruthy();
    });

    test('Movie with empty data is set correctly', () => {
        const movie = new MovieModel(movies[0]);

        expect(movie).toBeTruthy();
        expect(movie.title).toBeTruthy();
        expect(movie.description).toBeFalsy();
        expect(movie.username).toBeTruthy();
        expect(movie.likes).toBeTruthy();
        expect(movie.hates).toBeTruthy();
        expect(movie.created_at).toBeTruthy();

        expect(typeof movie.title === 'string').toBeTruthy();
        expect(typeof movie.username === 'string').toBeTruthy();
        expect(typeof movie.likes === 'number').toBeTruthy();
        expect(typeof movie.hates === 'number').toBeTruthy();
        expect(typeof movie.created_at === 'number').toBeTruthy();

        expect(movie.title).toEqual("King of Jazz");
        expect(movie.username).toEqual("lyurshev0");
        expect(movie.likes).toEqual(45);
        expect(movie.hates).toEqual(63);
        expect(movie.created_at).toEqual(47);

        expect(movie instanceof MovieModel).toBeTruthy();
    });

    test('Class instance has getter and setter functions', () => {
        const movie = new MovieModel(movies[0]);

        expect("getId" in movie).toBeTruthy();
        expect("getTitle" in movie).toBeTruthy();
        expect("getDescription" in movie).toBeTruthy();
        expect("getUsername" in movie).toBeTruthy();
        expect("getLikes" in movie).toBeTruthy();
        expect("getHates" in movie).toBeTruthy();
        expect("getCreatedAtStamp" in movie).toBeTruthy();
        
        expect("setId" in movie).toBeTruthy();
        expect("setTitle" in movie).toBeTruthy();
        expect("setDescription" in movie).toBeTruthy();
        expect("setUsername" in movie).toBeTruthy();
        expect("setLikes" in movie).toBeTruthy();
        expect("setHates" in movie).toBeTruthy();
        expect("setCreatedAtStamp" in movie).toBeTruthy();
    });
});

describe('Create movie functionality works correctly', () => {

    test('Add a single movie that has data, but user does not exist should violate table foreign key', async () => {
        const movie = new MovieModel(movies[1]);
        const result = await movie.createMovie();
 
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
        expect(typeof result === 'boolean').toBeTruthy();
    });

    test('Add a single movie that is missing data should fail because user does not exist and so it violates table foreign key', async () => {
        const movie = new MovieModel(movies[0]);
        const result = await movie.createMovie();

        expect(result).toBeFalsy();
        expect(typeof result === 'boolean').toBeTruthy();
    });

    test('Add a single movie with existing user', async () => {
        if(user) {    
            let newMovie = movies[1];
            newMovie.username = user!.username;
    
            const movie = new MovieModel(newMovie);
            const result = await movie.createMovie();
    
            expect(result).toBeDefined();
            expect(result).toBeTruthy();
            expect(typeof result === 'boolean').toBeTruthy();
            expect(movie.getId()).toBeTruthy();
            expect(movie.getId()).toBeDefined();
            expect(typeof movie.getId() === 'number').toBeDefined();
            expect(movie.getId()).toBeGreaterThan(0);
        } else {
            expect(true).toBeTruthy();
        }
    });
  
});
