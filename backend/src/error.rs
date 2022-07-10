use std::fmt::{Debug, Display, Formatter, Result as FmtResult};
use std::error::Error;
use std::convert::From;
use tonic::{Code as TonicCode, Status as TonicStatus};
use rusqlite::Error as RusqliteError;
use std::sync::PoisonError;

#[derive(Debug)]
pub enum SErrorType { 
    PoisonError,
    RusqliteError,
}

impl Display for SErrorType {
    fn fmt(&self, f: &mut Formatter<'_>) -> FmtResult {
        Debug::fmt(&self, f)
    }
}

impl From<&SErrorType> for TonicCode {
    fn from(error_type: &SErrorType) -> TonicCode {
        match error_type {
            SErrorType::PoisonError | SErrorType::RusqliteError => TonicCode::Internal,
        }
    }
}

#[derive(Debug)]
pub struct SError {
    error_type: SErrorType,
    source: Option<Box<dyn Error + Send + Sync + 'static>>,
}

/** Server Result */
pub type SResult<T> = Result<T, SError>;


impl Display for SError {
    fn fmt(&self, f: &mut Formatter<'_>) -> FmtResult {
        match self.source.as_ref() {
            Some(source) => write!(f, "{}: {}", self.error_type, source),
            None => write!(f, "{}", self.error_type),
        }
    }
}

impl Error for SError { }

impl From<SError> for TonicStatus {
    fn from(error: SError) -> Self {
        TonicStatus::new(
            TonicCode::from(&error.error_type),
            error.to_string())
    }
}

impl From<RusqliteError> for SError {
    fn from(error: RusqliteError) -> Self {
        Self { 
            error_type: SErrorType::RusqliteError, 
            source: Some(Box::new(error)) 
        }
    }
}

impl<T> From<PoisonError<T>> for SError {
    fn from(_: PoisonError<T>) -> SError {
        Self { 
            error_type: SErrorType::PoisonError, 
            source: None, 
        }
    }
}
