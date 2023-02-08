import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">主页</Link>
        </li>
        <li>
          <Link to="/password_random">密码生成器</Link>
        </li>
        <li>
          <Link to="/ipv4calculater">ipv4计算器</Link>
        </li>
        <li>
          <a href="https://github.com/PineAmongMoon/toolbox">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
