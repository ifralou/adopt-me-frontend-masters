import React, {MutableRefObject, ReactElement, useEffect, useRef} from 'react';
import {createPortal} from "react-dom";

type Children = {children: ReactElement};
const Modal = ({children} : Children) => {
    const elRef: MutableRefObject<HTMLDivElement | null> = useRef(
        document.createElement("div")
    );
    let nothing = <div></div>

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        if (!modalRoot || !elRef.current) {
            return;
        }
        modalRoot.appendChild(elRef.current);
        return () => {
            if (!elRef.current) {
                return;
            }
            modalRoot.removeChild(elRef.current);
        }
    }, []);

    if(!elRef.current) {
        return nothing;
    }

    return <div>
        {createPortal(<div>{children}</div>, elRef.current)}
    </div>
};

export default Modal;