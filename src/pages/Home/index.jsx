import { useState, useEffect } from 'react';
import { message, Input, Empty } from 'antd';
import Detail from './detail';
import Transaction from './trasanction';

const { Search } = Input;

function Home() {
  // 可以通过url query的方式入参
  const [hash, setHash] = useState(new URLSearchParams(window.location.search).get('hash') || '');
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // 为快速测试使用
    if (hash) {
      getBlock();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBlock = () => {
    if (!hash) {
      messageApi.open({
        type: 'info',
        content: 'please input hash',
      });
      return;
    }
    setLoading(true);
    fetch(`https://blockchain.info/rawblock/${hash}`)
      .then(async (res) => {
        const data = await res.json();
        setBlock(data);
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <Search
        placeholder="input block hash to search"
        onChange={(e) => setHash(e.target.value)}
        value={hash}
        loading={loading}
        onSearch={getBlock}
        onPressEnter={getBlock}
        size="large"
        enterButton="Search"
      />
      <br />
      <br />
      {block ? (
        <>
          <Detail detail={block} />
          <br />
          <Transaction transactions={block?.tx} />
        </>
      ) : (
        <Empty />
      )}
      {contextHolder}
    </div>
  );
}

export default Home;
