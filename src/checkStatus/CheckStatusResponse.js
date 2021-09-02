const ServiceResponseStatus = {
    NONE :"none",
    SUCCESS:"success",
    ERROR:"error",
    SHOULDLOGIN:"shouldlogin"
};


class ServiceResponse{
    
    // constructor(status, message,data){
    //     status = this.status,
    //     message = this.message,
    //     data = this.data
    // }
    
    status = ServiceResponseStatus.NONE;
    message;
    data;
}