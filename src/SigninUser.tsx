import React, { useState, useRef, useEffect } from "react";
import "./loginSurvey.css"
import logoSinLetras from "./assets/logo-frimac_sin_letras.webp"
import Dialog from "./Dialog";
import { Link } from "react-router-dom";

const baseURL: string = "http://localhost:8080/users/torre/";


const SigninUser: React.FC = () => {

    const [cedula, setCedula] = useState<string>("");
    const [datos, setDatos] = useState<any>({});
    const ultimaCedulaConsultada = useRef<string>("");
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [mensaje, setMensaje] = useState<string>("");
    const [surveys, setSurveys] = useState<[]>([]);
    const [selectedSurvey, setSelectedSurvey] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/surveys")
        .then((responseSurveys) => responseSurveys.json())
        .then((dataSurveys) => {
            setSurveys(dataSurveys);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatos((prevDatos: any) => ({
          ...prevDatos,
          [e.target.name]: e.target.value
        }));
    };
    
    const validationUserRegister = async () => {
        if (cedula === ultimaCedulaConsultada.current || cedula.trim() === "") {
            setDatos({ nombre: "", email: "", enabledSurveys: [] });
            return;
          }
        try {
            const responseTC: Response = await fetch(`${baseURL}${cedula}`);
            if (!responseTC.ok) {
                setMensaje("Se presentó un error, vuelva a intentarlo");
                dialogRef.current?.showModal();
                setDatos({ nombre: "", email: "", enabledSurveys: [] }); 
                return;
            }
            const dataValidation: any = await responseTC.json();
            if (!dataValidation.allowed) {
                setMensaje(dataValidation.message);
                dialogRef.current?.showModal();
                return
            }

            setDatos(dataValidation.userTCDTO);
            ultimaCedulaConsultada.current = cedula;

        } catch (error: any) {
            console.error("Error en la solicitud:", error);
            setMensaje("Error inesperado. Por favor, inténtelo de nuevo.");
            dialogRef.current?.showModal();
            setDatos({ nombre: "", email: "", enabledSurveys: [] });             
        }
    }


    return (
        <section id="login_section">
            <div className="image_logo">
                <img src={logoSinLetras} alt="" />
            </div>
            <form action="" id="login_form">
                <h2 className="login_title">Encuestas Friamc - Registro</h2>
                <p className="login_text">Cédula</p>
                <input
                 type="text"
                 name="cedula"
                 className="login_input"
                 id="input_doc"
                 value={cedula || ""}
                 onChange={(e) => setCedula(e.target.value)}
                 onBlur={validationUserRegister}
                 placeholder="Ingrese su número de cédula"
                 required />
                <p className="login_text">Nombre</p>
                <input
                type="text"
                name="nombre"
                className="login_input"
                id="input_name"
                value = {datos.nameUserTC || ""}
                onChange={handleChange}
                readOnly
                />
                <p className="login_text">Cargo</p>
                <input type="text"
                 name="cargo"
                 className="login_input"
                 id="input_position"
                 value={datos.positionUserTC || ""}
                 onChange={handleChange}
                 readOnly
                 />
                <p className="login_text">Área</p>
                <input 
                type="text" 
                name="area" 
                className="login_input" 
                id="input_area" 
                value={datos.operationUserTC || ""}
                onChange={handleChange}
                readOnly
                />
                <p>Tipo</p>
                <select name="tipo" id="select_type"className="login_input" >
                    <option value="">Seleccione el tipo de vinculación</option>
                    <option value="Frimac">Frimac</option>
                    <option value="Tercero">Tercero</option>
                </select>
                <p className="login_text">Encuestas habilitadas</p>
                <select name="encuestas" className="login_input" id="select_survey" required value={selectedSurvey || ""} onChange={(e) => setSelectedSurvey(e.target.value)}>
                    <option value="">Seleccione una encuesta</option>
                    {Array.isArray(surveys) &&
                        surveys.map((item: any) => (
                            item.state ? <option key={item.id} value={item.name}>{item.name}</option> : null
                        ))
                    }
                </select>
                <button className="submit">Confirmar registro</button>
                <div className="sign_module">
                    <p>¿Ya está registrado?</p>
                    <Link to="/LoginSurvey" >Ingrese aquí</Link>
                </div>
            </form>
            <Dialog ref={dialogRef} message={mensaje} />
        </section>
    );
};

export default SigninUser;