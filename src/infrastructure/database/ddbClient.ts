import AWS from 'aws-sdk';

const ui = (o: any) => JSON.stringify(o, null, 2);

export interface IDDBclient {
  put: (item: any) => Promise<any>;
  update: (key: any, item: any) => Promise<any>;
  transactUpdate: (updateParams: any[]) => Promise<any>;
  updateWithParams: (a: AWS.DynamoDB.DocumentClient.UpdateItemInput) => Promise<any>;
  del: (key: any) => Promise<any>;
  get: (key: any) => Promise<any>;
  query: (pk: string) => Promise<any>;
  queryWithParams: (params: any) => Promise<any[]>;
  queryWithParamsPaginated: (params: any, callback: (item: Array<any>) => void | Promise<void>) => Promise<void>;
  addCounter: (pk: string, sk: string) => Promise<any>;
  batchGetItemsAll: (ids: { id: string; type: string }[]) => Promise<any[]>;
  batchGetItems: (ids: { id: string; type: string }[]) => Promise<any[]>;
}

export const DDBclient = (tableName: string, docClient: any): IDDBclient => {
  const prepareUpdateParams = (key: any, item: any) => {
    const values: any = {};
    const names: any = {};
    let exp = 'set ';
    for (const key of Object.keys(item)) {
      if (key === 'id' || key === 'type') {
        continue;
      }
      if (typeof item[key] === 'undefined') {
        continue;
      }
      const ref = '#' + key;
      const valueKey = ':' + key;
      const value = item[key];
      exp += ref + '=' + valueKey + ', ';
      names[ref] = key;
      values[valueKey] = value;
    }
    return {
      TableName: tableName,
      Key: key,
      UpdateExpression: exp.slice(0, -2),
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ReturnValues: 'ALL_NEW',
    };
  };

  const put = async (item: any): Promise<any> => {
    const params = {
      TableName: tableName,
      Item: item,
    };
    try {
      const data = await docClient.put(params).promise();
      return data;
    } catch (e) {
      console.error('DDB保存に失敗', e);
      throw e;
    }
  };

  const update = async (key: any, item: any): Promise<any | undefined> => {
    const params = prepareUpdateParams(key, item);
    try {
      const data = await docClient.update(params).promise();
      return data.Attributes;
    } catch (e) {
      console.error('DDB更新に失敗', e);
      throw e;
    }
  };

  /**
   * 全部成功か全部失敗となるトランザクションアップデートを実行する
   * @param updateParams prepareUpdateParamsの戻り値の配列
   */
  const transactUpdate = async (updateParams: any[]): Promise<any> => {
    const params = {
      TransactItems: updateParams.map((value) => ({ Update: value })),
    };
    console.log('transactionWrite:', params);

    return await new Promise((ok, ng) => {
      docClient.transactWrite(params, function (err: any, data: any) {
        if (err) {
          console.log(err);
          ng(err);
        } else {
          console.log('ddb更新成功', data);
          ok(data);
        }
      });
    });
  };
  const updateWithParams = async (a: AWS.DynamoDB.DocumentClient.UpdateItemInput) => {
    console.log('ddb更新', a);
    const r = await docClient
      .update({
        ...a,
        TableName: tableName,
      })
      .promise();
    console.log('DDB更新成功', r);
    return r;
  };

  const del = async (key: any): Promise<any> => {
    console.log('DDBレコード削除', key);
    const params = {
      TableName: tableName,
      Key: key,
    };
    console.log('delete:', params);

    return await new Promise((ok, ng) => {
      docClient.delete(params, function (err: any, data: any) {
        console.log('ddbリクエスト結果', err, data);
        if (err) {
          console.log(err);
          ng(err);
        } else {
          console.log('ddbレコード削除成功', data);
          ok(data);
        }
      });
    });
  };
  const get = async (key: any): Promise<any> => {
    let ret: any = {};
    const param = {
      TableName: tableName,
      Key: key,
    };
    try {
      ret = await new Promise((ok, ng) => {
        docClient.get(param, function (err: any, data: any) {
          if (err) {
            console.log(err);
            ng(err);
            return;
          }
          if (!data.Item) {
            console.log('取得データが空です', key);
            ok(undefined);
            return;
          }
          ok(data.Item);
        });
      });
    } catch (e) {
      console.log('DDB失敗', e);
      throw e;
    }
    return ret;
  };

  const query = async (pk: string) => {
    const params = {
      TableName: tableName,
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': pk },
      KeyConditionExpression: '#id = :id', //検索対象が満たすべき条件を指定
    };
    let ret = {};
    console.log('DDB取得:', ui(params));
    try {
      ret = await new Promise((ok, ng) => {
        docClient.query(params, function (err: any, data: any) {
          if (err) {
            console.log(err);
            ng(err);
            return;
          }
          const list = data.Items;
          ok(list);
        });
      });
    } catch (e) {
      console.log('DDB失敗', e);
      throw e;
    }
    return ret;
  };
  const queryWithParams = async (params: any): Promise<any[]> => {
    const neo = Object.assign({ TableName: tableName }, params);
    let ret: any = {};
    console.log('DDB取得:', ui(neo));
    try {
      ret = await new Promise((ok, ng) => {
        docClient.query(neo, function (err: any, data: any) {
          console.log('ddbリクエスト結果', err, data);
          if (err) {
            console.log(err);
            ng(err);
            return;
          }
          const list = data.Items;
          ok(list);
        });
      });
    } catch (e) {
      console.log('DDB失敗', e);
      throw e;
    }
    return ret;
  };

  /**
   * クエリを行い、ページごとにcallbackメソッドを呼び出す
   * @param params クエリ条件
   * @param callback
   */
  const queryWithParamsPaginated = async (
    params: any,
    callback: (item: Array<any>) => void | Promise<void>,
  ): Promise<void> => {
    const neo = Object.assign({ TableName: tableName }, params);
    console.log('DDB取得:', ui(neo));
    try {
      // ページネーション (dataは重いので早めにメモリから捨てたい)
      const lastEvaluatedKey = await new Promise((ok, ng) => {
        docClient.query(neo, async (err: any, data: any) => {
          console.log('ddbリクエスト結果', err, data);
          if (err) {
            console.log(err);
            ng(err);
          }
          await callback(data.Items);
          ok(data.LastEvaluatedKey);
        });
      });

      // 続きがあれば再帰呼び出しでリクエストする
      if (lastEvaluatedKey) {
        const args = Object.assign({ ...neo }, { ExclusiveStartKey: lastEvaluatedKey });
        await queryWithParamsPaginated(args, callback);
      }
    } catch (e) {
      console.log('DDB失敗', e);
      throw e;
    }
  };

  const addCounter = async (pk: string, sk: string) => {
    const param = {
      TableName: tableName,
      Key: {
        id: pk,
        type: sk,
      },
      UpdateExpression: 'ADD #targetColumn :value',
      ExpressionAttributeNames: {
        '#targetColumn': 'current_value',
      },
      ExpressionAttributeValues: {
        ':value': 1,
      },
      ReturnValues: 'ALL_NEW',
    };
    const data = await docClient.update(param).promise();
    const currentValue = data.Attributes!['current_value'];
    return currentValue;
  };

  // 25件以上をbatchGetする
  const batchGetItemsAll = async (ids: { id: string; type: string }[]) => {
    const chunks = chunkArray(ids, 25);
    console.log('複数回のbatchGetを開始', chunks.length, '以下ログが前後するので注意');
    const promises = chunks.map((c) => {
      return batchGetItems(c);
    });
    const results: any[][] = await Promise.all(promises);
    // flatten
    return results.reduce((acc, val) => acc.concat(val), []);
  };
  const batchGetItems = async (ids: { id: string; type: string }[]) => {
    if (ids.length > 25) {
      throw new Error('batch size exceeded than 25');
    }
    console.log('DDB取得:', ui(ids));
    const requestItems = {
      [tableName]: {
        Keys: ids,
      },
    };
    try {
      const ret = await docClient
        .batchGet({
          RequestItems: requestItems,
        })
        .promise();
      console.log('ddbリクエスト結果', ret.Responses);
      if (!ret.Responses) {
        throw new Error('fail to fetch items');
      }
      const list = ret.Responses[tableName];
      return list;
    } catch (e) {
      console.warn('DDB失敗', e);
      throw e;
    }
  };

  return {
    put,
    update,
    transactUpdate,
    updateWithParams,
    del,
    get,
    query,
    queryWithParams,
    queryWithParamsPaginated,
    addCounter,
    batchGetItemsAll,
    batchGetItems,
  };
};
function chunkArray<T>(list: T[], size: number) {
  const tempArray = [];
  for (let i = 0; i < list.length; i += size) {
    const chunk = list.slice(i, i + size);
    tempArray.push(chunk);
  }
  return tempArray;
}
