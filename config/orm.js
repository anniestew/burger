// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

    var orm = {
    // Function that returns all table entries
    selectAll: function(tableInput, cb) {
        // Construct the query string that returns all rows from the target table
        var queryString = "SELECT * FROM " + tableInput + ";";

        // Perform the database query
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        // Construct the query string that inserts a single row into the target table
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        // console.log(queryString);

        // Database query
        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    },
    // Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);

		// Database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};

// Export the orm object for use in other modules
module.exports = orm;