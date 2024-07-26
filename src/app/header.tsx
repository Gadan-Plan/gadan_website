// components/Header.js  
import Link from 'next/link';  
import styles from './ui/public.module.css'; // 假设你有一个CSS模块来处理样式  
  
const Header = () => {  
  return (  
    <nav className={styles.header}>  
      <ul>  
        <li>  
          <Link href="/home">  
            <span>首页</span>  
          </Link>  
        </li>  
        <li>  
          <Link href="/apply">  
            <span>申请</span>  
          </Link>  
        </li>  
        <li>  
          <Link href="/statistics">  
            <span>统计</span>  
          </Link>  
        </li>  
        <li>  
          <Link href="/profile">  
            <span>个人中心</span>  
          </Link>  
        </li>  
      </ul>  
    </nav>  
  );  
};  
  
export default Header;