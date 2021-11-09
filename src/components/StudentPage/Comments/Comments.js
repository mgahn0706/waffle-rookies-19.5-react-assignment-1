import style from './Comments.module.scss';
import dayjs from 'dayjs';

const Comments = ({ item }) => {
  const formattedDate = dayjs(item.datetime).format('MMMM D, YYYY h:mm A');
  return (
    <div className={style.comment}>
      <div className={style.commentContent}>{item.content}</div>
      <div className={style.commentDate}>{formattedDate}</div>
    </div>
  );
};

export default Comments;
