import React from 'react';
import Dashboard from 'src/components/Dashboard/Dashboard';
// import { isAuthenticated } from "src/services/Auth/service";
// import { UserResponseDto } from "src/services/Patient/dtos/UserResponse.dto";
// import { useUserList } from "src/services/Patient/hooks";

const TsPage: React.FC = () => {
  // const {data} = useUserList();
  // const [users, setUsers] = useState<UserResponseDto[] | undefined >()

  // useEffect(()=>{
  //     setUsers(data)
  // },[data])

  return <Dashboard />;
};

export default TsPage;
