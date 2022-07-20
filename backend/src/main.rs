pub mod proto {
    tonic::include_proto!("grpc_template");
}
pub mod error;
pub mod server;
pub mod strings_service;
pub mod tonic_service;

use crate::server::Server;
use crate::strings_service::StringsService;
use proto::grpc_template_server::GrpcTemplateServer;
use rusqlite::Connection;
use std::sync::Mutex;
use tonic::transport::Server as TonicServer;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "127.0.0.1:50051".parse()?;
    let sqlite_file_path = "./my_db.db3";
    let sqlite_connection = Mutex::new(Connection::open(&sqlite_file_path)?);
    let server = Server { sqlite_connection };
    StringsService::create_table(&server)?;
    let service = GrpcTemplateServer::new(server);
    let web_serevice = tonic_web::enable(service);
    TonicServer::builder()
        .accept_http1(true)
        .add_service(web_serevice)
        .serve(addr)
        .await?;
    Ok(())
}
