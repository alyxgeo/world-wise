import styles from '../components/Sidebar.module.css'
import Logo from '../components/Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'
export default function Sidebar() {

    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            
            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; copyright {new Date().getFullYear()} by world wise Inc </p>
            </footer>

        </div>
    )
}
