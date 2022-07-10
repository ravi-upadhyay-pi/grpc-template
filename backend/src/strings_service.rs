use crate::error::SResult; 
use rusqlite::params;
use crate::server::Server;
use crate::proto::String as ProtoString;

pub struct StringsService {
}

impl StringsService {
    pub fn create_table(server: &Server) -> SResult<()> {
        let connection = server.sqlite_connection.lock()?;
        let mut create_strings_table_statement = connection.prepare(r#"
            CREATE TABLE IF NOT EXISTS Strings(
                id TEXT, 
                value TEXT
            )
        "#)?;
        create_strings_table_statement.execute(params![])?;
        Ok(())
    }

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
            LIMIT  ? 
            OFFSET ?
        "#)?;
        let strings_iter = list_string_page
            .query_map(
                params![page_size, page_number * page_size], 
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

#[cfg(test)]
mod tests {
    use super::*;
    use rusqlite::Connection;
    use std::sync::Mutex;

    fn init() -> SResult<Server> {
        let sqlite_connection = Mutex::new(Connection::open_in_memory()?);
        let server = Server {
            sqlite_connection,
        };
        StringsService::create_table(&server)?;
        Ok(server)        
    }

    #[test]
    fn save_string() -> SResult<()> {
        let server = init()?;
        StringsService::save_string(&server, "1", "test string")?;

        assert_eq!(StringsService::strings_count(&server)?, 1);
        Ok(())
    }

    #[test]
    fn get_strings() -> SResult<()> {
        let server = init()?;
        StringsService::save_string(&server, "1", "test string 1")?;
        StringsService::save_string(&server, "2", "test string 2")?;
        StringsService::save_string(&server, "3", "test string 3")?;
        
        assert_eq!(StringsService::strings_count(&server)?, 3);
        assert_eq!(StringsService::get_strings(&server, 0, 5)?, vec![
            ProtoString {id: "1".to_string(), string: "test string 1".to_string()},
            ProtoString {id: "2".to_string(), string: "test string 2".to_string()},
            ProtoString {id: "3".to_string(), string: "test string 3".to_string()},
        ]);
        assert_eq!(StringsService::get_strings(&server, 0, 1)?, vec![
            ProtoString {id: "1".to_string(), string: "test string 1".to_string()},
        ]);
        assert_eq!(StringsService::get_strings(&server, 2, 1)?, vec![
            ProtoString {id: "3".to_string(), string: "test string 3".to_string()},
        ]);
        assert_eq!(StringsService::get_strings(&server, 2, 3)?.len(), 0);
        Ok(())
    }
}