import PointsForm from "../../components/PointsForm";
import SearchUserPoints from "../../components/UserPointsForm";

const UserPoints = () => {
  return (
    <div className="min-h-screen p-5 text-gray-800">
     <div><SearchUserPoints/></div>
     <div><PointsForm/></div>
    </div>
  );
};

export default UserPoints;
