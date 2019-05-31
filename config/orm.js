// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks (num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
function objToSql(ob) {
    // column1=value, column2=value2,...
    var arr = [];
  
    for (var key in ob) {
      arr.push(key + "=" + ob[key]);
    }
  
    return arr.toString();
  }

var orm = {
    // Function that returns all table entries
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";

        // Perform database query
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        // Construct query string
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        // Database query
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    },
    // Function that updates a single table entry
    updateOne: function (table, objColVals, condition, cb) {
        
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            // Return results in callback
            cb(result);
        });
    }
};

// Export the orm
module.exports = orm;