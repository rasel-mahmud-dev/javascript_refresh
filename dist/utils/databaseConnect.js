const path = require("path");
function databaseConnect() {
    const sqlite3 = require('sqlite3').verbose();
    return new Promise((resolve, reject) => {
        const dbPath = path.resolve("dist/db/db.db");
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err && err.code === "SQLITE_CANTOPEN") {
                var newdb = new sqlite3.Database(dbPath, (err) => {
                    if (err) {
                        console.log("Getting error " + err);
                    }
                    resolve(newdb);
                });
            }
            else if (err) {
                console.log("Getting error " + err);
            }
            else {
            }
        });
        resolve(db);
    });
    // db.close();
}
module.exports = databaseConnect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2VDb25uZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJ1dGlscy9kYXRhYmFzZUNvbm5lY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLFNBQVMsZUFBZTtJQUN2QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsRUFBRTtRQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFFLGVBQWUsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3ZFLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEVBQUU7Z0JBQzFDLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDaEQsSUFBSSxHQUFHLEVBQUU7d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDcEM7b0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNwQztpQkFBTTthQUVOO1FBQ0YsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDWixDQUFDLENBQUMsQ0FBQTtJQUNGLGNBQWM7QUFDZixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUEifQ==