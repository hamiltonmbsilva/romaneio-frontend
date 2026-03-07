import "./Modal.css"

export function Modal({children,onClose}:any){

  return(

    <div className="modal-overlay">

      <div className="modal">

        <button className="close" onClick={onClose}>
          ✖
        </button>

        {children}

      </div>

    </div>

  )

}