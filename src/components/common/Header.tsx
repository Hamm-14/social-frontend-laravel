import { IMAGES } from "../../assets";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title } = props;
  const userName = localStorage.getItem("username");
  const userAvatar = localStorage.getItem("avatar");
  const navigate = useNavigate();

  const mainContainer: React.CSSProperties = {
    position: "fixed",
    top: "2%",
    left: "24%",
    width: "72.5%",
    borderBottom: "1px solid #C6C7CB",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 10,
  };

  const pageTitleContainer: React.CSSProperties = {
    width: "30%",
    border: "10x solid red",
    fontWeight: 600,
    fontSize: 24,
    paddingTop: 10,
  };

  const iconsContainer: React.CSSProperties = {
    width: "40%",
    display: "flex",
    justifyContent: "space-around",
  };

  const iconContainer: React.CSSProperties = {
    padding: "10px 10px 0px 10px",
    backgroundColor: "#F5F6F8",
    height: 35,
    cursor: "pointer",
  };

  const admin: React.CSSProperties = {
    color: "rgb(0, 47, 134)",
    fontWeight: 600,
    padding: 10,
    cursor: "pointer",
  };

  const handleCreatePostClick = () => {
    navigate('create-post');
  }

  return (
    <div style={mainContainer}>
      <div style={pageTitleContainer}>{title}</div>
      <div style={iconsContainer}>
        <div style={{ display: "flex" }} onClick={handleCreatePostClick}>
          <div>
           <LibraryAddIcon fontSize="large" sx={{color: "rgb(0, 47, 134)"}}/>
          </div>
          <div style={admin}>
            Create Post
          </div>
        </div>
        <div style={iconContainer}>
          <img src={IMAGES.message} alt="message-icon" width={25} height={25} />
        </div>
        <div className="notificationCount" style={iconContainer}>
          <img
            src={IMAGES.notification}
            alt="notification-icon"
            width={25}
            height={25}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <img
              src={userAvatar !== 'null' ? `http://127.0.0.1:8080/${userAvatar}` : IMAGES.profile_pic}
              alt="profile_pic"
              width={42}
              height={42}
            />
          </div>
          <div style={admin}>
            {userName}{" "}
            <img
              src={IMAGES.dropdown_icon}
              alt="dropdown icon"
              height={7}
              width={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
