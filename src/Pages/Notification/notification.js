import { message } from "antd";
import Notifications from "../../Components/Notification/notification";

function Notification() {
  const message =
    "Chúng tôi xin thông báo rằng bằng việc tiếp tục sử dụng dịch vụ của chúng tôi, Quý khách đồng ý tuân thủ các Điều khoản sử dụng mới nhất. Các điều khoản này bao gồm quy định về quyền và nghĩa vụ của người dùng, chính sách bảo mật, cũng như các điều khoản liên quan...";
  return (
    <div>
      <Notifications message={message} />
    </div>
  );
}

export default Notification;
