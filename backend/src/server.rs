use rusqlite::Connection;
use std::sync::Mutex;

pub struct Server {
    pub sqlite_connection: Mutex<Connection>,
}
