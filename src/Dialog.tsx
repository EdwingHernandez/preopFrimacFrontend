import { forwardRef } from "react";
import "./dialog.css"



const Dialog = forwardRef<HTMLDialogElement, { message: string }>(
    ({ message }, ref) => {
        return (
                <dialog ref={ref} className="dialogo">
                    <p>{message}</p>
                    <button onClick={() => (ref as React.RefObject<HTMLDialogElement>).current?.close()}>
                    Cerrar
                    </button>    
                </dialog>
        );
    }
);

export default Dialog;
