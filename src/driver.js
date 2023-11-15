// src/driver.js

/* EXAMPLE USAGE 

  useEffect(() => {
    async function setupDatabase() {
      // Initialize (and open) the test database because no path is passed to initializeDatabase.
      await SQLiteDriver.initializeDatabase();

      // Add 5 hearts
      await SQLiteDriver.addHearts(5);

      // To verify, let's fetch and log the current hearts
      const hearts = await SQLiteDriver.getCurrentHearts();
      console.log('Current Hearts:', hearts);
    }

    setupDatabase();
  }, []);

*/


import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const GAME_VERSION =  '9';
const DEFAULT_DB_PATH = '../assets/main.db';
const DEFAULT_DB_FNAME = 'eda.db';

class SQLiteDriver {
    static db = null;
    static dbPath = null;  // To store the provided dbPath

    static async initializeDatabase(pathToDatabaseFile = null) {
        this.dbPath = pathToDatabaseFile;
        await this._initializeDB(pathToDatabaseFile);
        await this._initTables();
        if (await this.isTestDB()) {
            await this._createDummyUser();
        } 
    }

    static async _initializeDB(pathToDatabaseFile = null) {
        const database = SQLite.openDatabase(DEFAULT_DB_FNAME)
        database._db.close()

        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }

        let dbUri;
        if (pathToDatabaseFile) {
            dbUri = pathToDatabaseFile;
        } else {
            const dbAsset = Asset.fromModule(require(DEFAULT_DB_PATH));
            await dbAsset.downloadAsync();
            dbUri = dbAsset.uri;
        }

        await FileSystem.downloadAsync(
            dbUri,
            FileSystem.documentDirectory + 'SQLite/' + DEFAULT_DB_FNAME
        );
        this.db = SQLite.openDatabase(DEFAULT_DB_FNAME);
    }

    static async _initTables() {
        await this.executeSql(`
            create table if not exists user(
                name string,
                age int,
                dark bool default false,
                font_size int default 12,
                favorite_color string default '#FF00FF',
                sex string
            );
        `);
        
        await this.executeSql(`
            create table if not exists game${GAME_VERSION}(
                max_level_beaten int default 0,
                max_level int default 3
            );
        `);

        await this.executeSql(`
            create table if not exists game${GAME_VERSION}_hearts(
                hearts int,
                timestamp string default (datetime('now', 'localtime'))
            );
        `);

        await this.executeSql(`
            create table if not exists game${GAME_VERSION}_vocab(
                word string primary key,
                quality float default 1.0,
                timestamp string default (datetime('now', 'localtime'))
            );
        `);
    }

    static async isTestDB() {
        return this.dbPath === null;
    }

    static async _createDummyUser() {
        await this.executeSql(`
            insert into user(name, age, dark, font_size, favorite_color, sex) 
            values ('TestUser', 20, false, 14, '#FF00FF', 'male');
        `);
    }

    static async getUserDetails() {
        const results = await this.executeSql('select * from user');
        if (results.rows.length > 0) {
            return results.rows.item(0);
        } else {
            return null;
        }
    }

    static async getCurrentHearts() {
        const results = await this.executeSql(`select SUM(hearts) as totalHearts from game${GAME_VERSION}_hearts`);
        if (results.rows.length > 0 && results.rows.item(0).totalHearts !== null) {
            return results.rows.item(0).totalHearts;
        } else {
            return 0;
        }
    }    

    static async addHearts(n) {
        await this.executeSql(`insert into game${GAME_VERSION}_hearts(hearts) values (?)`, [n]);
    }

    static async increaseVocab(word, quality = 1.0) {
        await this.executeSql(`
            insert or ignore into game${GAME_VERSION}_vocab(word, quality) 
            values (?, ?)
        `, [word, quality]);
        
        await this.executeSql(`
            update game${GAME_VERSION}_vocab set quality = quality + ? where word = ?
        `, [quality, word]);
    }

    static close() {
        if (this.db) {
            this.db._db.close();
        }
    }

    static executeSql(sql, args = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database is not initialized. Call 'initializeDatabase' first.");
                return;
            }

            this.db.transaction(tx => {
                tx.executeSql(
                    sql,
                    args,
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
    }
}

export default SQLiteDriver;