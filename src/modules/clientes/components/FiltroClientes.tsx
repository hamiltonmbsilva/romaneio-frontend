import { TextField, Stack, Autocomplete } from "@mui/material"
export default function FiltroClientes({
 search,
 setSearch,
 cidade,
 setCidade,
 estado,
 setEstado
}: any) {

 return (

  <Stack
   direction={{ xs: "column", md: "row" }}
   spacing={2}
   sx={{ marginBottom: 2 }}
  >

   <TextField
    label="Buscar Cliente"
    fullWidth
    value={search}
    onChange={(e) => setSearch(e.target.value)}
   />

   <TextField
    label="Cidade"
    fullWidth
    value={cidade}
    onChange={(e) => setCidade(e.target.value)}
   />

   <TextField
    label="Estado"
    fullWidth
    value={estado}
    onChange={(e) => setEstado(e.target.value)}
   />

   <Autocomplete
    options={cidade}
    onChange={(e,v)=>setCidade(v)}
    renderInput={(params)=>(
    <TextField {...params} label="Cidade"/>
    )}
    />

  </Stack>

  

 )
}