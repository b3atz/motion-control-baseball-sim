import { useLocation, useParams } from "react-router-dom";


function TeamProfile() {
  const { name } = useParams();
  const location = useLocation();
  const id = location.state?.id;

  return (
    <div>
      <h1>Team: {name}</h1>
      {id && <p>ID: {id}</p>}
    </div>
  );
}

export default TeamProfile;