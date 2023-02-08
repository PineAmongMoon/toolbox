import { Button, Result } from 'antd';
import { Link } from 'umi';

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      extra={
        <Link to="/">
          <Button type="primary">返回主页</Button>
        </Link>
      }
    />
  );
}
