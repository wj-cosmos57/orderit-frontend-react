import {post} from './common';

const login = async (tableNo) => {
  return await post(
    'table/login',
    {
      tableNo: tableNo
    },
    false,
  );
};

export {login};
