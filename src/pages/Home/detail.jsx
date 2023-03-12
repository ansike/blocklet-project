import { Descriptions } from 'antd';
import PropTypes from 'prop-types';
import HashTag from './HashTag/inde';
import { formatNumber, formatTime } from '../../utils/format';

function Detail(props) {
  const { detail } = props;
  return (
    <Descriptions
      title={
        <>
          Bitcoin Block {formatNumber(detail.height)} <br />
          <span style={{ fontSize: '12px', fontWeight: 400 }}>Mined on {formatTime(detail.time * 1000)}</span>
        </>
      }
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
      <Descriptions.Item label="Hash">
        <HashTag text={detail.hash} />
      </Descriptions.Item>
      <Descriptions.Item label="Version">{detail.ver}</Descriptions.Item>
      <Descriptions.Item label="PrevBock">
        <HashTag text={detail.prev_block} />
      </Descriptions.Item>
      <Descriptions.Item label="Merkle Root">
        <HashTag text={detail.mrkl_root} />
      </Descriptions.Item>
      <Descriptions.Item label="Bits">{formatNumber(detail.bits)}</Descriptions.Item>
      <Descriptions.Item label="NextBlock">
        {detail.next_block.map((hash) => {
          return <HashTag key={hash} text={hash} />;
        })}
      </Descriptions.Item>
      <Descriptions.Item label="Fee">{formatNumber(detail.fee)}</Descriptions.Item>
      <Descriptions.Item label="Nonce">{formatNumber(detail.nonce)}</Descriptions.Item>
      <Descriptions.Item label="TransactionNum">{formatNumber(detail.n_tx)}</Descriptions.Item>
      <Descriptions.Item label="Size">{formatNumber(detail.size)}</Descriptions.Item>
      <Descriptions.Item label="BlockIndex">{formatNumber(detail.block_index)}</Descriptions.Item>
      <Descriptions.Item label="MainChain">{detail.main_chain ? 'yes' : 'no'}</Descriptions.Item>
      <Descriptions.Item label="Height">{formatNumber(detail.height)}</Descriptions.Item>
      <Descriptions.Item label="Weight">{formatNumber(detail.weight)}</Descriptions.Item>
    </Descriptions>
  );
}

Detail.propTypes = {
  detail: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    ver: PropTypes.number.isRequired,
    prev_block: PropTypes.string.isRequired,
    mrkl_root: PropTypes.string.isRequired,
    bits: PropTypes.number.isRequired,
    next_block: PropTypes.arrayOf(PropTypes.string).isRequired,
    fee: PropTypes.number.isRequired,
    nonce: PropTypes.number.isRequired,
    n_tx: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    block_index: PropTypes.number.isRequired,
    main_chain: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};

export default Detail;
