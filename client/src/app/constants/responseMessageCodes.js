export const success= {
  NO_ROWS_FOUND:'NO_ROWS_FOUND', //Select query succesfully returned 0 rows
  SUCCESS_OPERATION:'SUCCESS_OPERATION' //Succesfully processed the request: insertion, updation, deletion
}

export const failure={
  IS_INVALID_INPUT_FORM:'IS_INVALID_INPUT_FORM', //Invalid Input values provided, status: 400
  IS_INTERNAL_SERVER_ERROR:'IS_INTERNAL_SERVER_ERROR', //Internal server Error, status: 500
  IS_ALREADY_EXISTS:'IS_ALREADY_EXISTS', //Insertion failed as row already exists, status:400
  NO_ROW_INSERTED:'NO_ROW_INSERTED', //Something went wrong therefore no rows inserted: 500
  NO_ROW_UPDATED:'NO_ROW_UPDATED' //Something went wrong therefore no rows updated: 500
}
