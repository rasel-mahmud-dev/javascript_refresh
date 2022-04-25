const path = require("path");

function databaseConnect(){
	const sqlite3 = require('sqlite3').verbose();
	
	return new Promise((resolve, reject)=>{
		const dbPath = path.join(__dirname, "../", "db/db.db")
		const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
			if (err && err.code === "SQLITE_CANTOPEN") {
				var newdb = new sqlite3.Database(dbPath, (err) => {
					if (err) {
						console.log("Getting error " + err);
					}
					resolve(newdb)
				});
			} else if (err) {
				console.log("Getting error " + err);
			} else {
			
			}
		})
		resolve(db)
	})
	// db.close();
}

module.exports = databaseConnect
