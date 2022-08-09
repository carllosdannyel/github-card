import { useEffect, useState } from "react";
import githubAPI from "../api/githubAPI";

const Card = () => {
  const [dataRequest, setDataRequest] = useState({ success: {}, error: "" });
  const [search, setSearch] = useState({ searchName: "", userSelect: "" });
  const [defaultValue, setDefaultValue] = useState("github");
  const [userList, setUserList] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    githubAPI(defaultValue).then((response) => {
      setUserList([response.login]);
      setDataRequest({ ...dataRequest, success: response });
    });
  }, []);

  const handleClickSearchUser = () => {
    setDefaultValue(search);
    setToggleButton(!toggleButton);
  };

  return (
    <div className="w-80">
      <div className={userList ? null : "flex justify-center mb-3"}>
        {userList && (
          <select
            value={search.userSelect}
            onChange={(e) =>
              setSearch({ ...search, userSelect: e.target.value })
            }
            className="p-2 w-full my-3 text-center border-none outline-none rounded-md"
          >
            {userList.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="">
        <input
          value={search.searchName}
          onChange={(e) => setSearch({ ...search, searchName: e.target.value })}
          className="p-1 rounded-md w-full mb-3 text-center outline-none"
          placeholder="Buscar Usuário"
        />
      </div>
      <div className="bg-gray-200 w-full h-96 rounded-md flex flex-col items-center p-1">
        {dataRequest.success && (
          <div className="flex flex-col py-2 w-full h-full justify-between items-center">
            <img
              className="rounded-full"
              src={dataRequest.success.avatar_url}
              alt={dataRequest.success.login}
              width="230px"
            />
            <p className="font-bold">{dataRequest.success.name}</p>
            <p className="text-center">{dataRequest.success.bio}</p>
            <p>{dataRequest.success.location}</p>
          </div>
        )}
      </div>
      {toggleButton ? (
        <input
          className="bg-white w-full mt-3 p-1 rounded-md cursor-pointer"
          type="button"
          onClick={() => setToggleButton(!toggleButton)}
          value="SALVAR CARTÃO"
        />
      ) : (
        <input
          className="bg-white w-full mt-3 p-1 rounded-md cursor-pointer"
          onClick={handleClickSearchUser}
          type="button"
          value="BUSCAR USUÁRIO"
        />
      )}
    </div>
  );
};

export default Card;
