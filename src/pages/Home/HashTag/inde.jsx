import { useRef } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

function HashTag({ text = '' }) {
  const [messageApi, contextHolder] = message.useMessage();
  const textRef = useRef(null);

  const handleCopyClick = (e) => {
    e.stopPropagation();
    copy(text);
    messageApi.open({
      type: 'success',
      content: 'copy success',
    });
  };

  return (
    <span ref={textRef}>
      {contextHolder}
      {text.slice(0, 4)}-{text.slice(-4)}&nbsp;
      <CopyOutlined onClick={handleCopyClick} />
    </span>
  );
}

HashTag.propTypes = {
  text: PropTypes.string.isRequired,
};
export default HashTag;
