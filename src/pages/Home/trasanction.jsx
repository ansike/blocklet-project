import { Collapse, List, Col, Row, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import HashTag from './HashTag/inde';
import { formatNumber } from '../../utils/format';

const { Panel } = Collapse;

function Transaction(props) {
  const { transactions = [] } = props;
  return (
    <div className="transaction">
      <List
        pagination={{ position: 'bottom', align: 'center', pageSize: 15 }}
        itemLayout="horizontal"
        dataSource={transactions}
        renderItem={(item, index) => {
          const { hash, vin_sz: vinSz, fee, time, inputs, out } = item;

          const btc = (
            out.reduce((prev, cur) => {
              return prev + cur.value;
            }, 0) /
            10 ** 8
          ).toFixed(8);

          // 区块中第一个交易的标识："vin_sz" 字段为 1，"inputs" 数组中只有一个元素，同时该元素的 "prev_out" 字段中的 "tx_index" 字段为 0
          const isFirstBlock = vinSz === 1 && inputs.length === 1 && inputs[0].prev_out.tx_index === 0;

          let fromNode = null;
          if (isFirstBlock) {
            fromNode = 'Block Reward';
          } else if (inputs.length === 1) {
            fromNode = <HashTag text={inputs[0].prev_out.addr || ''} />;
          } else {
            fromNode = `${inputs.length} Inputs`;
          }

          return (
            <Collapse key={index}>
              <Panel
                header={
                  <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div className="detail">
                        <Tooltip title={isFirstBlock ? 'Coinbase' : 'Transaction'}>
                          <div className="type">{isFirstBlock ? 'CB' : 'TX'}</div>
                        </Tooltip>
                        <div className="hashBox">
                          <div className="idbox">
                            <span className="label">{index}</span>
                            <span className="text">ID: </span>
                            <span className="hash">
                              <HashTag text={hash} />
                            </span>
                          </div>
                          <div className="time">{dayjs(time * 1000).format('MM/DD/YYYY, hh:mm:ss')}</div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div className="transac">
                        <div className="from">
                          <span className="label">From</span>
                          <span className="text">{fromNode}</span>
                        </div>
                        <div className="to">
                          <span className="label">To</span>
                          <span className="text">{out.length} Outputs</span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                      <div className="money">
                        <div className="btc">
                          <span>{btc} BTC</span>
                          <span className="text">&nbsp;•$ ***</span>
                        </div>
                        <div className="fee">
                          <span className="feeText">Fee</span>
                          <span>{formatNumber(fee)} Sats</span>
                          <span className="text">&nbsp;•$ ***</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                }>
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                  <Col className="columnLine" xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="transFrom">
                      <div className="title">From</div>
                      {inputs.map((ipt, idx) => {
                        const { addr = '', value } = ipt.prev_out;
                        // 因addr可能有相等的case，使用idx
                        return (
                          // eslint-disable-next-line
                          <div key={addr + idx} className="transItem">
                            <div className="left">{idx + 1}</div>
                            <div className="right">
                              <div>{(isFirstBlock && 'Block Reward') || <HashTag text={addr} />}</div>
                              <div>{(value / 10 ** 8).toFixed(8)} BTC</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="transTo">
                      <div className="title">To</div>
                      {out.map((ipt, idx) => {
                        const { addr = '', value } = ipt;
                        // 因addr可能有相等的case，使用idx
                        return (
                          // eslint-disable-next-line
                          <div key={addr + idx} className="transItem">
                            <div className="left">{idx + 1}</div>
                            <div className="right">
                              <div>{addr ? <HashTag text={addr} /> : 'Unknown'}</div>
                              <div>{(value / 10 ** 8).toFixed(8)} BTC</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          );
        }}
      />
    </div>
  );
}

Transaction.propTypes = {
  transactions: PropTypes.array.isRequired,
};
export default Transaction;
