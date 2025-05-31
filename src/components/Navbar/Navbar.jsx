import { Link, NavLink } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import styles from "./Navbar.module.css";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaGlobe, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../CartDrawer/CartDrawer";
import dictionary from "../../utils/dictionary";

function Navbar() {
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const { handleChangeLang, lang } = useLang();
  const { cart } = useCart();
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { user, logout } = useAuth();
  const langRef = useRef(null);
  const userRef = useRef(null);

  const t = dictionary[lang];

  useEffect(
    function () {
      function handleClickOutsideLang(e) {
        if (
          isOpenLang &&
          langRef.current &&
          !langRef.current.contains(e.target)
        ) {
          setIsOpenLang(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutsideLang);

      return () => {
        document.removeEventListener("mousedown", handleClickOutsideLang);
      };
    },
    [isOpenLang]
  );

  useEffect(
    function () {
      function handleClickOutsideUser(e) {
        if (
          isOpenUser &&
          userRef.current &&
          !userRef.current.contains(e.target)
        ) {
          setIsOpenUser(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutsideUser);

      return () => {
        document.removeEventListener("mousedown", handleClickOutsideUser);
      };
    },
    [isOpenUser]
  );

  function handleOpenLang() {
    setIsOpenLang((isOpenLang) => !isOpenLang);
  }

  function handleOpenUSer() {
    setIsOpenUser((isOpenUser) => !isOpenUser);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img
          className={styles.navbarLogoImg}
          src="../../../public/riotlogo.png"
          alt="s"
        />
      </div>
      <div className={styles.navbarInfo}>
        <div className={styles.navbarSelect}>
          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.isactive : ""}`
            }
          >
            {t.home}
          </NavLink>
          <NavLink
            to="/champion"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.isactive : ""}`
            }
          >
            {t.champions}
          </NavLink>

          <NavLink
            to="/area"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.isactive : ""}`
            }
          >
            {t.regions}
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.isactive : ""}`
            }
          >
            {t.shop}
          </NavLink>
        </div>
        <div className={styles.navbarSetting}>
          <div className={styles.langBtn} ref={langRef}>
            <FaGlobe
              onClick={handleOpenLang}
              className={styles.navbarLang}
              size={35}
            />
            {isOpenLang && (
              <div className={styles.langDropdown}>
                <div
                  className={styles.lang}
                  onClick={() => {
                    handleChangeLang("vi");
                    setIsOpenLang(false);
                  }}
                >
                  Tiếng Việt <span></span>
                </div>
                <div
                  className={styles.lang}
                  onClick={() => {
                    handleChangeLang("en");
                    setIsOpenLang(false);
                  }}
                >
                  English
                </div>
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link className={styles.loginLink} to="/login">
                {t.login}
              </Link>
              <Link className={styles.loginLink} to="/signup">
                {t.signup}
              </Link>
            </>
          ) : (
            <>
              <div
                ref={userRef}
                onClick={handleOpenUSer}
                className={styles.user}
              >
                <img className={styles.avtImg} src={user.avatar} alt="" />
                <p>{user.username}</p>

                {isOpenUser && (
                  <div className={styles.usergDropdown}>
                    <Link to="/myaccount/profile" className={styles.infoLink}>
                      <div className={styles.info}>{t.profile}</div>
                    </Link>

                    <div onClick={logout} className={styles.logout}>
                      {t.logout}
                    </div>
                  </div>
                )}
              </div>

              <div
                onClick={() => setOpenCartDrawer(true)}
                className={styles.cart}
              >
                <FaShoppingCart className={styles.cartIcon} size={35} />
                {cart.length !== 0 && (
                  <span className={styles.quantity}>{cart.length}</span>
                )}
              </div>

              <CartDrawer
                isOpen={openCartDrawer}
                onClose={() => setOpenCartDrawer(false)}
                cartItems={cart}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
