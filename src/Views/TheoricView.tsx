/*--------------------------------------------------------*/
/*-----------IMPORT UTILITIES-----------*/
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { fetchOneTheoric, deleteTheoric } from "../app/Reducers/theoricSlice";
import { Theoric } from "../app/interface";
import { editTheoric } from "../app/Reducers/theoricSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ownerTemplate } from "../app/Utils/userUtilities";
import { useAuth0 } from "@auth0/auth0-react";
import RedirectToLogin from "../Components/RedirectToLogin/RedirectToLogin";
import { theoricTemplate } from "../app/Utils/theoricUtilites";
/*-----------IMPORT MUI & CSS-----------*/
import {
  Button,
  TextField,
  Box,
  Grid,
  useTheme,
  Modal,
  LinearProgress,
  Breadcrumbs,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { StackMigajas } from "../Components/Style/StyledComponents";
import {
  ButtonsContainer,
  StyledTypography,
  StyledTypography2,
  StyledTypography3,
  StyledPaper,
  InfoContainer,
  StyledBoxModal,
  StyledBoxModal2,
  InfoSubContainer,
  StyledDivModal2,
} from "../Components/Theoric/StyledComponents";

/*--------------------------------------------------------*/

export default function TheoricView() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = useAppSelector((state) => state.user.data);
  const [theoric, setTheoric] = useState<Theoric>(theoricTemplate);
  const [role, setRole] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [charged, setCharged] = useState(false);
  const { isAuthenticated } = useAuth0();
  const [editable, setEditable] = useState(theoricTemplate);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchOneTheoric(id).then((res) => {
        setTheoric(res);
        setEditable(res);
      });
      setRole(usuario.role);
    }
    if (typeof id === "string") {
      setEditable({ ...editable, _id: id });
    }
  }, [usuario, id]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    let aux: boolean = !open;
    setOpen(!open);
    if (aux === false) {
      setEditable({ ...theoric, _id: "" });
    }
    if (open === false && typeof id === "string") {
      setEditable({
        owner: ownerTemplate,
        title: theoric.title,
        content: theoric.content,
        author: theoric.author,
        images: theoric.images,
        comments: theoric.comments,
        _id: id,
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setEditable({ ...editable, [event.target.name]: event.target.value });
  };

  const handleSaver = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof id === "string") {
      setEditable({ ...editable, _id: id });
    }
    editTheoric(editable);
    setOpen(!open);
    setSave(!save);
    window.location.reload();
  };

  const handleOpenDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenDelete(!openDelete);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof id === "string") {
      deleteTheoric(id);
      navigate("/");
    }
  };

  const migajas = [
    <Link
      to="/"
      style={{
        fontFamily: "Helvetica",
        textDecoration: "none",
        color: `${theme.palette.getContrastText(
          theme.palette.background.default
        )}`,
      }}
    >
      HOME
    </Link>,
    <Link
      to="/Content"
      style={{
        fontFamily: "Helvetica",
        textDecoration: "none",
        color: `${theme.palette.getContrastText(
          theme.palette.background.default
        )}`,
      }}
    >
      MATERIAL
    </Link>,
    <Link
      to={`/Theoric/${id}`}
      style={{
        fontFamily: "Helvetica",
        textDecoration: "none",
        textTransform: "uppercase",
        color: `${theme.palette.getContrastText(
          theme.palette.background.default
        )}`,
      }}
    >
      {theoric.title}
    </Link>,
  ];

  if (!isAuthenticated) {
    setTimeout(() => {
      setCharged(true);
    }, 4000);
    if (!charged) {
      return (
        <Modal open={true}>
          <LinearProgress
            color="secondary"
            style={{
              width: "90vw",
              marginLeft: "5vw",
              marginTop: "49vh",
              height: "1vh",
            }}
          />
        </Modal>
      );
    } else {
      return <RedirectToLogin open={true} />;
    }
  }

  return (
    <Grid style={{ padding: "0.5vh" }}>
      <StackMigajas spacing={2}>
        <Breadcrumbs separator="›">{migajas}</Breadcrumbs>
      </StackMigajas>
      {role > 3 && role < 6 && (
        <ButtonsContainer>
          <Button variant="contained" onClick={handleOpen}>
            Editar
          </Button>
          <Button color="error" variant="contained" onClick={handleOpenDelete}>
            Borrar
          </Button>
        </ButtonsContainer>
      )}

      <InfoContainer>
        <StyledTypography>{theoric.title}</StyledTypography>

        <InfoSubContainer>
          <StyledTypography2>Por: {theoric.author}</StyledTypography2>

          <StyledPaper elevation={4}>{theoric.content}</StyledPaper>

          <Box
            style={{
              display: "flex",
              marginTop: "2.5vh",
              justifyContent: "flex-end",
            }}
          >
            {theoric.comments.length > 0 &&
              theoric.comments.map((com: string) => {
                return <StyledTypography3> {com} </StyledTypography3>;
              })}
            <LocalOfferIcon
              style={{
                color: `${theme.palette.getContrastText(
                  theme.palette.background.default
                )}`,
              }}
            />
          </Box>
        </InfoSubContainer>
      </InfoContainer>

      {theoric.images.length > 0 &&
        theoric.images.map((img: string) => {
          return <img src={img} key={img} alt="" />;
        })}

      <Modal open={openDelete}>
        <StyledBoxModal2>
          <Button
            variant="contained"
            style={{ marginLeft: "43.2vw", marginTop: "-4vh" }}
            onClick={handleOpenDelete}
          >
            Cerrar
          </Button>
          <StyledTypography>¿Estás segur@?</StyledTypography>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Borrar
          </Button>
        </StyledBoxModal2>
      </Modal>
      <Modal open={open}>
        <StyledBoxModal>
          <Button
            style={{ marginLeft: "73.1vw", marginTop: "-0.2vh" }}
            variant="contained"
            onClick={handleOpen}
          >
            Cerrar
          </Button>
          <TextField
            style={{ width: "45vw", marginLeft: "1vh" }}
            name="title"
            onChange={handleInputChange}
            value={editable.title}
            multiline
          />
          <StyledDivModal2>
            <TextField
              style={{ width: "77vw" }}
              name="content"
              onChange={handleInputChange}
              value={editable.content}
              multiline
            />
          </StyledDivModal2>
          <TextField
            style={{ marginLeft: "1vh", width: "25vw" }}
            name="author"
            onChange={handleInputChange}
            value={editable.author}
            multiline
          />
          <Button
            style={{ marginLeft: "72.3vw", marginBottom: "-0.2vh" }}
            variant="contained"
            onClick={handleSaver}
          >
            Guardar
          </Button>
        </StyledBoxModal>
      </Modal>
    </Grid>
  );
}
