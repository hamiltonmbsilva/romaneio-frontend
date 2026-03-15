import { DataGrid } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

export default function ClienteTable({
 clientes,
 loading,
 page,
 total,
 onPageChange,
 onEdit,
 onDelete
}: any) {

 const columns = [

  { field:"nomeFantasia", headerName:"Nome", flex:1 },

  { field:"cidade", headerName:"Cidade", flex:1 },

  { field:"estado", headerName:"Estado", width:120 },

  { field:"endereco", headerName:"Endereço", flex:1 },

  {
   field:"acoes",
   headerName:"Ações",
   width:120,
   renderCell:(params:any)=>(
    <>
     <IconButton
      color="primary"
      onClick={()=>onEdit(params.row)}
     >
      <EditIcon/>
     </IconButton>

     <IconButton
      color="error"
      onClick={()=>onDelete(params.row.id)}
     >
      <DeleteIcon/>
     </IconButton>
    </>
   )
  }

 ]

 return(

  <DataGrid
   rows={clientes}
   columns={columns}
   getRowId={(row)=>row.id}

   loading={loading}

   pageSizeOptions={[10]}

   paginationMode="server"
   rowCount={total}

   paginationModel={{page,pageSize:10}}

    onPaginationModelChange={(model)=>{
    onPageChange(model.page)
    }}

    disableRowSelectionOnClick
  />

 )
}