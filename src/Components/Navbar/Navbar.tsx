/*--------------------------------------------------------*/
/*-----------IMPORT UTILITIES-----------*/
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { deleteUserPanel } from "../../app/Utils/editUser";
/*-----------IMPORT COMPONENTS-----------*/
import { LoginButton } from "../ButtonsOutLogin/LoginButton/LoginButton";
import { LogoutButton } from "../ButtonsOutLogin/LogoutButton/LogoutButton";
import LateralMenu from "./LateralMenu/LateralMenu";
import DarkModeButton from "../ThemeModeButton/ThemeModeButton";
import IsBannedModal from "./LateralMenu/isBannedModal";
import ModalDeleteAccount from "./ModalDeleteAccount";
/*-----------IMPORT MUI & CSS-----------*/
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Button,
  Skeleton,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Img } from "../Content/ContentStyled";
import css from "./NavBar.module.css";
import logo from "./logo.png";
import { SearchBar } from "../SearchBar/SearchBar";

const pages = ["Material complementario", "Foro"];
const settings = ["Perfil", "Cerrar Sesion"];

const Navbar = () => {
  const navigate = useNavigate();
  const DBUser = useAppSelector((state) => state.user.data);
  const [pivote, setPivote] = useState(false); // para TA y ADM moverse en libertad por forum learning y forum prep
  const [openBanned, setOpenBanned] = React.useState(false);
  const [charged, setCharged] = useState<boolean>(false);
  const { logout } = useAuth0();
  useEffect(() => {
    if (DBUser.role === 3 || DBUser.role === 5) {
      setPivote(true);
    }
    setTimeout(() => {
      setCharged(true);
    }, 4000);
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCreate, setAnchorElCreate] =
    React.useState<null | HTMLElement>(null);
  const { isAuthenticated, user } = useAuth0();
  const [createMenu, setCreateMenu] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCreateMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleCloseNavMenu = (
    event: React.MouseEvent<HTMLLIElement | HTMLButtonElement>
  ) => {
    let target = event.target;
    // if (target.name === "Perfil") {
    // setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseCreateMenu = () => {
    setAnchorElCreate(null);
  };

  const handleOnClickLogoHome = () => {
    window.scrollTo(0, 0);
  };

  // handle de si estas baneado en publicar discusion

  const handleClickOpenBanned = () => {
    setOpenBanned(true);
  };

  const handleCloseBanned = () => {
    setOpenBanned(false);
    setAnchorElCreate(null);
  };
  // ================//

  // handle eliminar cuenta  + estado local
  const [deleteAccount, setDeleteAccount] = React.useState(false);
  let [inputDelete, setInputDelete] = React.useState<any>("");
  const handleOpenDeleteAccount = () => {
    setDeleteAccount(true);
  };
  const handleCloseDeleteAccount = () => {
    setDeleteAccount(false);
  };
  const handleChangeDelete = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputDelete(event.target.value);
  };
  const handleDeleteUser = () => {
    deleteUserPanel(DBUser._id)
      .then(() => setInputDelete("Eliminado147"))
      .then(() => logout({ returnTo: window.location.origin }));
  };
  const handleSuccessDelete = () => {
    window.location.reload();
  };
  // ===========//
  return (
    <AppBar
      position="sticky"
      sx={{
        maxHeight: "5rem",
        minHeight: "5rem",
        backgroundColor: "info.main",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar sx={{ height: "5rem" }} disableGutters>
          <Box
            display="flex"
            alignItems="center"
            component="div"
            width="15%"
            height="8vh"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            {DBUser.first_name ? <LateralMenu user={DBUser} /> : null}
            <Link to="/" onClick={handleOnClickLogoHome}>
              <Img
                src={logo}
                alt="no responde img"
                sx={{ marginTop: ".3em" }}
              />
            </Link>
          </Box>
          <DarkModeButton />
          {isAuthenticated ? <SearchBar /> : null}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              component="div"
              width="50%"
              height="8vh"
              sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
            >
              {DBUser.first_name ? <LateralMenu user={DBUser} /> : null}
              <Link to="/">
                <Img
                  src={logo}
                  alt="no responde img"
                  sx={{ marginTop: ".2em" }}
                />
              </Link>
            </Box>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Menu>
          </Box>

          {/* Box Menu en MD */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              marginRight: "4em",
            }}
          >
            {isAuthenticated ? (
              <Button
                onClick={handleOpenCreateMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Publicar
              </Button>
            ) : null}
            <Menu
              open={Boolean(anchorElCreate)}
              anchorEl={anchorElCreate}
              onClose={handleCloseCreateMenu}
            >
              <IsBannedModal
                handleCloseBanned={handleCloseBanned}
                openBanned={openBanned}
              />
              <MenuItem
                onClick={() =>
                  DBUser.isBanned ? handleClickOpenBanned() : navigate("/Ask")
                }
              >
                Discusión
              </MenuItem>
              {DBUser.role >= 4 ? (
                <MenuItem onClick={() => navigate("/Theoric/Create")}>
                  Contenido Teórico
                </MenuItem>
              ) : null}
              {DBUser.role >= 4 ? (
                <MenuItem onClick={() => navigate("/Exercise/Create")}>
                  Ejercicio
                </MenuItem>
              ) : null}
            </Menu>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                to={DBUser.role === 0 ? "/Forum/News" : "/Forum"}
                className={css.StyledLink}
              >
                Foro
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/Content" className={css.StyledLink}>
                Material
              </Link>
            </Button>
          </Box>
          {/* ----------------- */}

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={DBUser.first_name} //if the image can't be loaded then will show the first alt's letter (user's firstname)
                    src={
                      DBUser.profile_picture.length > 0
                        ? DBUser.profile_picture
                        : DBUser.avatar
                        ? DBUser.avatar
                        : "/static/images/avatar/2.jpg"
                    }
                  />
                </IconButton>
              </Tooltip>
              <ModalDeleteAccount
                handleCloseDeleteAccount={handleCloseDeleteAccount}
                deleteAccount={deleteAccount}
                handleChangeDelete={handleChangeDelete}
                inputDelete={inputDelete}
                handleDeleteUser={handleDeleteUser}
                handleSuccessDelete={handleSuccessDelete}
              />
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Perfil" ? (
                      <Button
                        color="inherit"
                        sx={{ width: "100%", height: "100%" }}
                        onClick={() => {
                          navigate(`/Profile/${DBUser?._id}`);
                        }}
                      >
                        {setting}
                      </Button>
                    ) : (
                      <LogoutButton></LogoutButton>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <div>
              {!charged ? (
                <Skeleton variant="circular" width={50} height={50} />
              ) : (
                <LoginButton />
              )}
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
