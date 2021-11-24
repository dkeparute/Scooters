
function Message({msg, showMsg}) {

    return(
        <div className='message' style={{height: showMsg ? '100px' : '0'}} >
            <span>{msg}</span>
        </div>
    );
}
export default Message;