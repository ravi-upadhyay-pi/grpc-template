use crate::server::Server;
use crate::strings_service::StringsService;
use tonic::{Request, Response, Status};
use crate::proto::service_server::Service;
use crate::proto::{String, Void, Page, GetStringsResponse, GetStringsCountResponse};

type TonicResult<T> = Result<Response<T>, Status>;

#[tonic::async_trait]
impl Service for Server {
    async fn save_string(&self, request: Request<String>) -> TonicResult<Void> {
        StringsService::save_string(
            &self, 
            request.get_ref().id.as_ref(), 
            &request.get_ref().string.as_ref())?;
        Ok(Response::new(Void::default()))
    }

    async fn get_strings_count(&self, _: Request<Void>) -> TonicResult<GetStringsCountResponse> {
        let strings_count = StringsService::strings_count(&self)?;
        Ok(Response::new(GetStringsCountResponse {
            strings_count
        }))
    }

    async fn get_strings(&self, request: Request<Page>) -> TonicResult<GetStringsResponse> {
        let strings = StringsService::get_strings(
                &self, request.get_ref().page_number, request.get_ref().page_size)?;
        Ok(Response::new(GetStringsResponse { 
            string: strings, 
        }))
    }
}

