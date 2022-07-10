use crate::error::SResult; 
use rusqlite::params;
use crate::server::Server;
use crate::proto::String as ProtoString;

pub struct StringsService { }

impl StringsService {
    pub fn save_string(server: &Server, id: &str, string: &str) -> SResult<()> {
        let connection = server.sqlite_connection.lock()?;
        let mut insert_string_statement = connection.prepare(r#"
            INSERT INTO Strings (id, value) 
            VALUES (?, ?)
        "#)?;
        insert_string_statement.execute(params![id, string])?;
        Ok(())
    }

    pub fn strings_count(server: &Server) -> SResult<i64> {
        let connection = server.sqlite_connection.lock()?;
        let mut string_count_statement = connection.prepare(r#"
            SELECT COUNT(*) 
            FROM Strings
        "#)?;
        let count = string_count_statement.query_row(params![], |row| row.get(0))?;
        Ok(count)
    }

    pub fn get_strings(
        server: &Server, page_number: i64, page_size: i64
    ) -> SResult<Vec<ProtoString>> {
        let connection = server.sqlite_connection.lock()?;
        let mut list_string_page = connection.prepare(r#"
            SELECT id, value 
            FROM Strings 
            SKIP ? 
            TAKE ?
        "#)?;
        let strings_iter = list_string_page
            .query_map(
                params![page_number * page_size, page_size], 
                |row| {
                    Ok(ProtoString {
                        id: row.get(0)?,
                        string: row.get(1)?,
                    })
                })?;
        let mut result = Vec::new();
        for string in strings_iter {
            result.push(string?)
        }
        Ok(result)
    }
}
