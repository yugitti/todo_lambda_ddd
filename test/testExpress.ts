import axios from 'axios';

const main = async () => {
  const id = '5a4e8308-472e-40fc-8481-ea80b62bf7b6';
  const groupId = 'G000001';
  const url = `http://localhost:3000/task/get/${groupId}/${id}`;

  const res = await axios.get(url);
  console.log(res);
};

main();
