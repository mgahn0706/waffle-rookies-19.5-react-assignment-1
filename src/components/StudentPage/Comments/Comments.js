import "./Comments.css"
import StudentItem from "../../StudentList/StudentItem/StudentItem";
import dayjs from "dayjs";

const Comments = ({item}) => {
    const formattedDate = dayjs(item.datetime).format('MMMM D, YYYY h:mm A')
    return(
            <div className="comment">
                <div className="commentContent">{item.content}</div>
                <div className="commentDate">{formattedDate}</div>
            </div>
        )


}



export default Comments;