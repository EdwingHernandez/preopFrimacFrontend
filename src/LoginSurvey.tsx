import React, { useState, useRef } from "react";
import "./loginSurvey.css"
import logoSinLetras from "./assets/logo-frimac_sin_letras.webp"
import Dialog from "./Dialog";


const baseURL: string = "http://localhost:8080";
const urlUserSurvey: string = "/users/surveys/";

const LoginSurvey: React.FC = () => {
    const [cedula, setCedula] = useState<string>("");
    const [datos, setDatos] = useState<any>({});
    const ultimaCedulaConsultada = useRef<string>("");
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [mensaje, setMensaje] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDatos((prevDatos: any) => ({
          ...prevDatos,
          [e.target.name]: e.target.value
        }));
    };
   

    const validarCedula = async () => {
        if (cedula === ultimaCedulaConsultada.current || cedula.trim() === "") {
            return;
          }
        try {
            const response: Response = await fetch(`${baseURL}${urlUserSurvey}${cedula}`);
            if (!response.ok) {
                setMensaje("El usuario no existe, por favor valide el número de documento ingresado");
                dialogRef.current?.showModal();
            }
            const dataUser: any = await response.json();
            
            if (dataUser.enabledSurveys.length === 0) {
                setMensaje("El usuario no tiene encuestas asignadas");
                dialogRef.current?.showModal();
            }
            setDatos(dataUser);
            ultimaCedulaConsultada.current = cedula;

        } catch (error: any) {
            setMensaje("Se presentó un error, vuelva a intentarlo");
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
                <h2 className="login_title">Encuestas Friamc - Ingreso</h2>
                <p className="login_text">Cédula</p>
                <input
                 type="text"
                 name="cedula"
                 className="login_input"
                 id="input_doc"
                 value={cedula || ""}
                 onChange={(e) => setCedula(e.target.value)}
                 onBlur={validarCedula}
                 placeholder="Ingrese su número de cédula"
                 required />
                <p className="login_text">Nombre</p>
                <input
                type="text"
                name="nombre"
                className="login_input"
                id="input_name"
                value = {datos.name || ""}
                onChange={handleChange}
                readOnly
                />
                <p className="login_text">Cargo</p>
                <input type="text"
                 name="cargo"
                 className="login_input"
                 id="input_position"
                 value={datos.position || ""}
                 onChange={handleChange}
                 readOnly
                 />
                <p className="login_text">Área</p>
                <input 
                type="text" 
                name="area" 
                className="login_input" 
                id="input_area" 
                value={datos.area || ""}
                onChange={handleChange}
                readOnly
                />
                <p className="login_text">Encuestas habilitadas</p>
                <select name="encuestas" className="login_input" id="select_survey" required value={datos.enabledSurveys || ""} onChange={handleChange}>
                    <option value="">Seleccione una encuesta</option>
                    {Array.isArray(datos.enabledSurveys) &&
                        datos.enabledSurveys.map((surveyname: string) => (
                            <option key={surveyname} value={surveyname}>
                                {surveyname}
                            </option>
                        ))
                    }
                </select>
                <button className="submit">Iniciar encuesta</button>
                <div className="sign_module">
                    <p>¿No está registrado?</p>
                    <a href="#">Regístrese</a>
                </div>
            </form>
            <Dialog ref={dialogRef} message={mensaje} />
        </section>
    );
};

export default LoginSurvey;
