import { useSelector } from "react-redux";
import PointsForm from "../../components/PointsForm";
import SearchUserPoints from "../../components/UserPointsForm";
import Loader from "../../components/Loader";

const UserPoints = () => {
  const { loading, success, pointsUpdate } = useSelector((state) => state.userPoints);
  return (
    <div className="min-h-screen p-5 text-gray-800">
      <SearchUserPoints />
      <div className="mt-20">{loading && <Loader />}</div>
      {success || pointsUpdate?.loading ? <PointsForm /> : null}
    </div>
  );
};

export default UserPoints;
