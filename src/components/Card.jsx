import { useEffect, useState } from "react";

const Card = () => {
  const [dataRequestList, setDataRequestList] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [userName, setUserName] = useState("github");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("github");
  const [userNameList, setUserNameList] = useState([]);
  // const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((data) => {
        setUserNameList([data.login.toLowerCase(), ...userNameList]);
        setDataUser(data);
        setDataRequestList([...dataRequestList, data]);
      });
  }, [userName]);

  console.log("renderizou");

  const handleClickSearchUser = () => {
    setUserName(search.toLowerCase());
    setSelect(search.toLowerCase())
    setSearch("");
  };

  const handleClickSaveCard = () => {
    console.log("salvou");
  };

  return (
    <div className="w-80">
      <div className={userNameList ? null : "flex justify-center mb-3"}>
        {userNameList && (
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="p-2 w-full my-3 text-center border-none outline-none rounded-md"
          >
            {userNameList.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 rounded-md w-full mb-3 text-center outline-none"
          placeholder="Nome de Usuário"
        />
      </div>
      <div className="bg-gray-200 w-full h-96 rounded-md flex flex-col items-center p-1">
        {dataRequestList
          .filter((option) => option.login.toLowerCase() === select)
          .map((user) => (
            <div
              key={user}
              className="flex flex-col py-2 w-full h-full justify-between items-center"
            >
              <img
                className="rounded-full"
                src={user.avatar_url}
                alt={user.login}
                width="230px"
              />
              <p className="font-bold">{user.name}</p>
              <p className="text-center">{user.bio}</p>
              <p>{user.location}</p>
            </div>
          ))}
      </div>
      <div className="flex">
        <input
          className="bg-white w-full mt-3 p-1 font-bold hover:bg-green-600 duration-300 mr-1 rounded-md cursor-pointer"
          onClick={handleClickSearchUser}
          type="button"
          value="BUSCAR"
        />
        <input
          className="bg-white w-full mt-3 p-1 font-bold hover:bg-red-600 duration-300 ml-1 rounded-md cursor-pointer"
          onClick={handleClickSaveCard}
          type="button"
          value="SALVAR"
        />
      </div>
    </div>
  );
};

export default Card;
